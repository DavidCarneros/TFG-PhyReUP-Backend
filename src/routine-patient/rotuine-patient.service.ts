import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutinePatient } from './routine-patient.entity';

@Injectable()
export class RoutinePatientService {

    constructor(
        @InjectRepository(RoutinePatient)
        private readonly routinePatientRepository: Repository<RoutinePatient>,
    ){}


    async getRoutinesByPatientKey(key:string){
        return await this.routinePatientRepository
            .createQueryBuilder("routine_patient")
            .select(["routine_patient","routine","exercise"])
        //    .select(["routine"])
            .orderBy("routine_patient.id","ASC")
            .innerJoin("routine_patient.routine","routine")
            .innerJoin("routine_patient.patient","patient")
            .innerJoin("routine.exercise","exercise")
          //  .innerJoin("routine","routine-patient")
          //  .innerJoin("routine-patient.patient","patient")
          //  .innerJoin("routine.patient","patient")
          //  .innerJoin("routine.exercise","exercise")
            .where('patient.key = :key',{key:key})
            .andWhere('routine_patient.active = true')
            .getMany();
    }

}
