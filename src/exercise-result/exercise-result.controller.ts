import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExerciseService } from 'src/exercise/exercise.service';
import { ExerciseResult } from './exercise-result.entity';
import { ExerciseResultService } from './exercise-result.service';

@Controller('exercise-result')
export class ExerciseResultController {

    constructor(
        private readonly exerciseResultService: ExerciseResultService
    ) {}

    @Post()
    async register(@Body() exerciseResult:ExerciseResult){
        return await this.exerciseResultService.register(exerciseResult);
    }

    @Get()
    async getAll(){
        return await this.exerciseResultService.getAll();
    }


}
