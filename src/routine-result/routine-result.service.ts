import { Injectable } from '@nestjs/common';
import { RoutineResult } from './routine-result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseResult } from 'src/exercise-result/exercise-result.entity';
import { isNullOrUndefined } from 'util';

export enum Evaluation {
    AlwaysProblems,
    NowProblems,
    NowNotProblems,
    NowLessFailures,
    NowMoreFailures,
    SameFailures,
    NowLessTime, 
    NowMoreTime,
    SameTime
}

@Injectable()
export class RoutineResultService {

    constructor(
        @InjectRepository(RoutineResult)
        private readonly routineResultRepository: Repository<RoutineResult>,
        @InjectRepository(ExerciseResult)
        private readonly exerciseResultRespository: Repository<ExerciseResult>,
    ){}


    async register(routineResult: RoutineResult){
        const result = await this.routineResultRepository.save(routineResult);

        
        if(routineResult.exerciseResult.length != 0){
            for(let i = 0; i < routineResult.exerciseResult.length ; i++){
                let exerciseResult = routineResult.exerciseResult[i];
                exerciseResult.routineResult = result;
                await this.exerciseResultRespository.save(exerciseResult);
            }
        }
    
        return result;
    }

    async getAll(){
        return await this.routineResultRepository
            .createQueryBuilder("routine-result")
            .select(["routine-result"])
            .getMany();
    }

    async getAllWithExerciseResult(){
        return await this.routineResultRepository
            .createQueryBuilder("routine-result")
            .select(["routine-result","exercise-result"])
            .innerJoin("routine-result.exerciseResult","exercise-result")
            .getMany();
    }

    async getRoutineResultAndExerciseResult(patientId:number, routineId:number){
        return await this.routineResultRepository
        .createQueryBuilder("routine-result")
       // .select(["routine-result"])
        .leftJoinAndSelect("routine-result.exerciseResult","exerciseResult")
        .where("routine-result.patient = :patientId",{patientId:patientId})
        .andWhere("routine-result.routine = :routineId",{routineId:routineId})
        .orderBy("routine-result.id","DESC")
        .getMany();
    }

    async evaluateRoutines(patientId:number, routineId:number){

        const routineResultAndExercisesResults = await this.getRoutineResultAndExerciseResult(patientId,routineId);

        return this.evaluate(routineResultAndExercisesResults);
    }

    private async evaluate(routineResult:RoutineResult[]){
        
        let actualResult:RoutineResult;
        let otherResults:RoutineResult[];

        let evaluation:Evaluation[] = [];

        if(routineResult.length > 1){
            actualResult = routineResult[0];
            otherResults = routineResult.slice(1,routineResult.length);
        }
        else {
            actualResult = routineResult[0];
        }

        // Solo hay un resultado para esta rutina
        if(isNullOrUndefined(otherResults)){
            // comprobar si ha habido problemas
            if(actualResult.problems){
                evaluation.push(Evaluation.AlwaysProblems);
            }
            

        }
        // hay varios resultados para esta rutina
        else {

            let lastProblems;
            for (let i = 0; i < otherResults.length && i < 2; i++){
                if(otherResults[i].problems){
                    lastProblems = true;
                    break;
                }
            }
            // Ha tenido problemas
            if(actualResult.problems){
                // Ha tenido problemas antes
                if(lastProblems){
                    evaluation.push(Evaluation.AlwaysProblems);
                }
                // No ha tenido problemas antes
                else {
                    evaluation.push(Evaluation.NowProblems);
                }

            }
            // No ha tenido problemas
            else {
                // Ha tenido problemas antes
                if(lastProblems){
                    evaluation.push(Evaluation.NowNotProblems);
                }
        
            }

            // Comprobacion de errores
            let actualTotalFails = 0;
            let actualTotalTime = 0;
            for(let i = 0; i < actualResult.exerciseResult.length; i++){
                actualTotalFails += actualResult.exerciseResult[i].total_failures;
                actualTotalTime += actualResult.exerciseResult[i].total_time;
            }
            actualTotalFails = actualTotalFails / actualResult.exerciseResult.length;
            actualTotalTime = actualTotalTime / actualResult.exerciseResult.length;

            let otherResultsTotalFails = [];
            let otherResultsTotalTime = [];
             
            for(let i = 0; i < otherResults.length; i++){
                let aux = 0;
                let auxTime = 0;
                for(let j = 0; j < otherResults[i].exerciseResult.length; j++){
                    aux += otherResults[i].exerciseResult[j].total_failures;
                    auxTime += otherResults[i].exerciseResult[j].total_time;
                }
                aux = aux / otherResults[i].exerciseResult.length;
                auxTime = auxTime / otherResults[i].exerciseResult.length;

                otherResultsTotalFails.push(aux);
                otherResultsTotalTime.push(auxTime);
            }
            

            let avg_otherResultTotalFails = otherResultsTotalFails.reduce(function(a, b){ return a + b; }, 0) / otherResultsTotalFails.length;
            let avg_otherResultTime = otherResultsTotalTime.reduce(function(a,b){return a + b;},0) / otherResultsTotalTime.length;
            console.log("Total fails avg")
            console.log(avg_otherResultTotalFails);
            console.log("actual total fail")
            console.log(actualTotalFails);
            let difference_fail = actualTotalFails - avg_otherResultTotalFails;
            console.log("difference fail")
            console.log(difference_fail)

            if(Math.abs(difference_fail) <= 1 ) {
                // todo normal
                evaluation.push(Evaluation.SameFailures);
            }
            else {
                if(difference_fail < 0 ){
                    // Menos fallos
                    evaluation.push(Evaluation.NowLessFailures);
                }
                else {
                    // mas fallos
                    evaluation.push(Evaluation.NowMoreFailures);
                }
            }

            difference_fail = actualTotalTime - avg_otherResultTime;
            if(Math.abs(difference_fail) <= 1 ) {
                // todo normal
                evaluation.push(Evaluation.SameTime);
            }
            else {
                if(difference_fail < 0 ){
                    // Menos tiempo
                    evaluation.push(Evaluation.NowLessTime);
                }
                else {
                    // mas tiempo
                    evaluation.push(Evaluation.NowMoreTime);
                }
            }

        }
        console.log(evaluation);
        return {"evaluation" : evaluation};
    }

}
