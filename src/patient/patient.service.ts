import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { RoutinePatientService } from 'src/routine-patient/rotuine-patient.service';
import { RoutineResultService } from 'src/routine-result/routine-result.service';
import { RoutineResult } from 'src/routine-result/routine-result.entity';
import { Routine } from 'src/routine/routine.entity';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly routinePatientService: RoutinePatientService,
        private readonly routineResultService: RoutineResultService
    ) {}

    async register(patient:Patient){
        return await this.patientRepository.save(patient);
    }

    async getPatientByKey(key_string: string){
        const patient = await this.patientRepository
            .createQueryBuilder("patient")
            .select(["patient"])
            .where("key = :key", {key:key_string})
            .getOne()
        
    
        return patient;
    }
    async getAllPatient(){
        return await this.patientRepository
            .createQueryBuilder("patient")
            .where("key = :key", {key:"e1234"})
            .select(["patient"])
            .getOne();
    }

    async evaluateAllRoutinesByKey(key_string:string){

        const patient = await this.getPatientByKey(key_string);
        const routines = await this.routinePatientService.getRoutinesByPatientKey(key_string); // Todas las rutinas
        let evaluation = []

        for(let i = 0; i < routines.length; i++){
            let routinesResult = await this.routineResultService.getRoutineResultAndExerciseResult(patient.id, routines[i].id);
            evaluation.push(this.evaluatePatient(routines[i].routine,routinesResult));
        }
        console.log(evaluation);
        return evaluation;
        return await this.patientRepository
            .createQueryBuilder("patient")
            .select(["patient"])
            .leftJoinAndSelect("routine-patient.patient", "patient")
            //.where("patient.key = :key",{key:key_string})
            .getOne();
    }

    private evaluatePatient(routine: Routine, routineResult: RoutineResult[]){
        
        let evaluationObject = {}
        evaluationObject["routine"] = routine;
        let evaluation = []

        /// NO HA HECHO NADA
        if(routineResult.length == 0){
            evaluation.push(EvaluationPatient.No);
        }
        /// SOLO TIENE 1 
        else if (routineResult.length <= 1) {
            evaluation.push(EvaluationPatient.One);
            evaluation.push((routineResult[0].problems) ? EvaluationPatient.Problems : EvaluationPatient.NotProblems);
            evaluation.push((routineResult[0].inTime) ? EvaluationPatient.InTime : EvaluationPatient.NotInTime);

        }
        /// TIENE VARIOS 
        else {
            evaluation.push((routineResult[routineResult.length-1].problems) ? EvaluationPatient.Problems : EvaluationPatient.NotProblems);
            evaluation.push((routineResult[routineResult.length-1].inTime) ? EvaluationPatient.InTime : EvaluationPatient.NotInTime);

            let actualTotalFails = 0;
            let actualTotalTime = 0;
            for(let i = 0; i < routineResult[routineResult.length-1].exerciseResult.length; i++){
                actualTotalFails += routineResult[routineResult.length-1].exerciseResult[i].total_failures;
                actualTotalTime += routineResult[routineResult.length-1].exerciseResult[i].total_time;
            }
            actualTotalFails = actualTotalFails / routineResult[routineResult.length-1].exerciseResult.length;
            actualTotalTime = actualTotalTime / routineResult[routineResult.length-1].exerciseResult.length;

            let otherResultsTotalFails = [];
            let otherResultsTotalTime = [];
             
            for(let i = 0; i < routineResult.length -1; i++){
                let aux = 0;
                let auxTime = 0;
                for(let j = 0; j < routineResult[i].exerciseResult.length; j++){
                    aux += routineResult[i].exerciseResult[j].total_failures;
                    auxTime += routineResult[i].exerciseResult[j].total_time;
                }
                aux = aux / routineResult[i].exerciseResult.length;
                auxTime = auxTime / routineResult[i].exerciseResult.length;

                otherResultsTotalFails.push(aux);
                otherResultsTotalTime.push(auxTime);
            }
            

            let avg_otherResultTotalFails = otherResultsTotalFails.reduce(function(a, b){ return a + b; }, 0) / otherResultsTotalFails.length;
            let avg_otherResultTime = otherResultsTotalTime.reduce(function(a,b){return a + b;},0) / otherResultsTotalTime.length;
           
            let difference_fail = actualTotalFails - avg_otherResultTotalFails;
            let difference_time = actualTotalTime - avg_otherResultTime;

            if(Math.abs(difference_fail) <= 1 && Math.abs(difference_time) <= 1) {
                // todo normal
                evaluation.push(EvaluationPatient.Same);
            }
            else {
                if(difference_fail < 0 && difference_time < 0 ){
                    // Menos fallos
                    evaluation.push(EvaluationPatient.Progress);
                }
                else {
                    // mas fallos
                    evaluation.push(EvaluationPatient.NotProgress);
                }
                
            }

        }
        evaluationObject["evaluations"] = evaluation;

        return evaluationObject;
    }

    

}

export enum EvaluationPatient {
    No,
    One,
    Problems,
    NotProblems, 
    InTime, 
    NotInTime, 
    Progress,
    NotProgress,
    Same
}
/*

{
    "routine" : {OBJECT}
    "result" : [...]
}

result ->
    Puede terminar ? 
    Acaba en tiempo correcto?
    Mejora errores - 
    Mejora tiempo -

*/