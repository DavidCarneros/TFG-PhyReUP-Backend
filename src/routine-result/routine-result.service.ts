import { Injectable } from '@nestjs/common';
import { RoutineResult } from './routine-result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseResult } from 'src/exercise-result/exercise-result.entity';

@Injectable()
export class RoutineResultService {

    constructor(
        @InjectRepository(RoutineResult)
        private readonly routineResultRepository: Repository<RoutineResult>,
        @InjectRepository(ExerciseResult)
        private readonly exerciseResultRespository: Repository<ExerciseResult>,
    ){}

    async register(routineResult: RoutineResult){

        const result = await this.routineResultRepository.save(routineResult);

        
        if(routineResult.exerciseResult.length != 0){
            for(let i = 0; i < routineResult.exerciseResult.length ; i++){
                let exerciseResult = routineResult.exerciseResult[i];
                exerciseResult.routineResult = result;
                await this.exerciseResultRespository.save(exerciseResult);
            }
        }
//        console.log("########")
//        console.log(result)

        return;
    }

    async getAll(){
        return await this.routineResultRepository
            .createQueryBuilder("routine-result")
            .select(["routine-result"])
            .getMany();
    }

    async getAllWithExerciseResult(){
        return await this.routineResultRepository
            .createQueryBuilder("routine-result")
            .select(["routine-result","exercise-result"])
            .innerJoin("routine-result.exerciseResult","exercise-result")
            .getMany();
    }

}
