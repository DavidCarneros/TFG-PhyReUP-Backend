import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoutinePatientService } from './rotuine-patient.service';
import { RoutinePatient } from './routine-patient.entity';
import { Routine } from 'src/routine/routine.entity';

@Controller('routine-patient')
export class RoutinePatientController {

    constructor(
        private readonly routinePatientService: RoutinePatientService
    ){}

    @Post()
    async saveRoutineResult(@Body() routineRatient: RoutinePatient){
        
    }

    @Get("patient/:patient")
    async getRoutineByPatient(@Param() params){
        const patientKey = params.patient;
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
