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
        const newExercise = new Exercise();
        newExercise.back = exercise.back;
        newExercise.hand = exercise.hand;
        newExercise.keyPoint = exercise.keyPoint;
        newExercise.name = exercise.name;
        newExercise.points = exercise.points;
        newExercise.videoUrl = "";
        return await this.exerciseService.register(newExercise);
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
