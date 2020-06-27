import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseService {

    constructor(
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
    ){}

    /**
     * Save an exercise
     * @param exercise 
     */
    async register(exercise:Exercise){
        return await this.exerciseRepository.save(exercise);
    }

    /**
     * Returns all exercises
     */
    async getAll(){
        return await this.exerciseRepository
            .createQueryBuilder("exercise")
            .select(["exercise"])
            .orderBy('id')
            .getMany();
    }

    async getExerciseById(id:number){
        return await this.exerciseRepository
            .createQueryBuilder("exercise")
            .select(["exercise"])
            .where("id = :id", {id:id})
            .getOne();
    }

}
