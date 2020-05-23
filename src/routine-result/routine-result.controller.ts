import { Controller, Post, Body, Get } from '@nestjs/common';
import { RoutineResultService } from './routine-result.service';
import { RoutineResult } from './routine-result.entity';

@Controller('routine-result')
export class RoutineResultController {

    constructor(
        private readonly routineResultService: RoutineResultService
    ){}

    @Post()
    async saveRoutineResult(@Body() routineResult: RoutineResult){
        console.log(routineResult);
        return await this.routineResultService.register(routineResult);
    }

    @Get()
    async getAll(){
        return await this.routineResultService.getAll();
    }

    @Get('exercise-result')
    async getAllWithExerciseResult(){
        return await this.routineResultService.getAllWithExerciseResult();
    }

}
