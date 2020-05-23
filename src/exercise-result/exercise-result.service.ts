import { Injectable } from '@nestjs/common';
import { ExerciseResult } from './exercise-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseResultService {
    constructor(
        @InjectRepository(ExerciseResult)
        private readonly exerciseResultRespository: Repository<ExerciseResult>
    ){}

    async register(exerciseResult:ExerciseResult){
        return await this.exerciseResultRespository.save(exerciseResult);
    }

    async getAll(){
        return await this.exerciseResultRespository
            .createQueryBuilder("exercise-result")
            .select(["exercise-result"])
            .getMany();
    }


}
