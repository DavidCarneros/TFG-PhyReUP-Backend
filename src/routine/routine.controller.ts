import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { Routine } from './routine.entity';

@Controller('routine')
export class RoutineController {

    constructor(
        private readonly routineService: RoutineService
    ){}


    @Get("patient/:patient")
    async getRoutineByPatient(@Param() params){
        const patientKey = params.patient;
        return await this.routineService.getRoutinesByPatientKey(patientKey);
    }

    @Get("id/:id")
    async getRoutineById(@Param() params){
        const routineId = params.id;
        return await this.routineService.getRoutineById(routineId);
    }

    @Get()
    async getAllRotuines(){
        return await this.routineService.getAll();
    }

    @Get('exercises')
    async getAllRoutinesAndExercises(){
        return await this.routineService.getAllWithExercises();
    }

    @Post()
    async saveRoutine(@Body() routine:Routine){
        console.log(routine)
        console.log("SAVE REQUEST")
        return await this.routineService.register(routine);
    }

}
