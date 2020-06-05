import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RoutineResultService } from './routine-result.service';
import { RoutineResult } from './routine-result.entity';
import { PatientService } from 'src/patient/patient.service';

@Controller('routine-result')
export class RoutineResultController {

    constructor(
        private readonly routineResultService: RoutineResultService,
        private readonly patientService: PatientService
    ){}

    @Post(":patientId")
    async saveRoutineResult(@Param() param, @Body() routineResult: RoutineResult){
 
        const patient = await this.patientService.getPatientByKey(param.patientId)
        const saveResult = new RoutineResult();
        saveResult.complete = routineResult.complete;
        saveResult.endDate = routineResult.endDate;
        saveResult.exerciseResult = routineResult.exerciseResult;
        saveResult.patient = patient;
        saveResult.problems = routineResult.problems;
        saveResult.routine = routineResult.routine;
        saveResult.startDate = routineResult.startDate;
        await this.routineResultService.register(saveResult);

        // Evaluate

        return await this.routineResultService.evaluateRoutines(patient.id,saveResult.routine.id);
    }

    @Get()
    async getAll(){
        return await this.routineResultService.getAll();
    }

    @Get('exercise-result')
    async getAllWithExerciseResult(){
        return await this.routineResultService.getAllWithExerciseResult();
    }

    @Get('testing')
    async test(){
        return await this.routineResultService.evaluateRoutines(1,1);


    }

}
