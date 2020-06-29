import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoutinePatientService } from './rotuine-patient.service';
import { RoutinePatient } from './routine-patient.entity';
import { Routine } from 'src/routine/routine.entity';
import { RoutinePatientBody } from './routine-patient.types';
import { PatientService } from 'src/patient/patient.service';

@Controller('routine-patient')
export class RoutinePatientController {

    constructor(
        private readonly routinePatientService: RoutinePatientService,
        private readonly patientService: PatientService
    ){}

    @Post()
    async saveRoutineResult(@Body() routinePatientBody: RoutinePatientBody){
        let key = routinePatientBody.patient.slice(0,-1);
        console.log(routinePatientBody);
        console.log(key.toString());
        let patient = await this.patientService.getPatientByKey(key.toString());
        console.log(patient);
        const routinePatient = new RoutinePatient()
        routinePatient.active = routinePatientBody.active;
        routinePatient.routine = routinePatientBody.routine;
        routinePatient.patient = patient;
        return await this.routinePatientService.register(routinePatient);
    }

    @Get("patient/:patient")
    async getRoutineByPatient(@Param() params){
        console.log(`patient: ${params.patient}`);
        let prueba = params.patient.slice(0,-1);
        console.log(prueba.length);
        const patientKey = prueba;
        const result = await this.routinePatientService.getRoutinesByPatientKey(patientKey);
        console.log(result);

        let routines:Routine[] = [];
        for(let i = 0; i < result.length ; i++){
            routines.push(result[i]["routine"]);
        }

        return routines;
        //return await this.routineService.getRoutinesByPatientKey(patientKey);
    }
    /*
    @Get()
    async getAll(){
        return await this.routineResultService.getAll();
    }

    @Get('exercise-result')
    async getAllWithExerciseResult(){
        return await this.routineResultService.getAllWithExerciseResult();
    }
    */    

}
