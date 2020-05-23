import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from './exercise.entity';

@Controller('exercise')
export class ExerciseController {

    constructor(
        private readonly exerciseService: ExerciseService
    ){}

    @Post()
    async saveExercise(@Body() exercise:Exercise){
        console.log(exercise);
        return await this.exerciseService.register(exercise);
    }

    @Get()
    async getAllExercises(){
        return await this.exerciseService.getAll();
    }

    @Get(":id")
    async getOneExercise(@Param() params){
        return await this.exerciseService.getExerciseById(params.id);
    }



}
