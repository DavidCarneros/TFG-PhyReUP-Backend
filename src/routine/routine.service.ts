import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './routine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoutineService {

    constructor(
        @InjectRepository(Routine)
        private readonly routineRespository: Repository<Routine>,
    ){}

    async register(routine:Routine){
        return await this.routineRespository.save(routine);
    }

    async getAll(){
        return await this.routineRespository
            .createQueryBuilder("routine")
            .select(["routine"])
            .getMany();
    }

    async getRoutineById(id:number){
        return await this.routineRespository
            .createQueryBuilder("routine")
            .select(["routine"])
            .where("id = :id", {id:id})
            .getOne();
    }

    async getRoutinesByPatientKey(key:string){
        return await this.routineRespository
            .createQueryBuilder("routine")
            .select(["routine"])
            .orderBy("routine.id","ASC")
            .innerJoin("routine_patient.routine","routine")
            .getMany();
    }

}
