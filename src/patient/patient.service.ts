import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';
import { RoutinePatientService } from 'src/routine-patient/rotuine-patient.service';
import { RoutineResultService } from 'src/routine-result/routine-result.service';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly routinePatientService: RoutinePatientService,
        private readonly routineResultService: RoutineResultService
    ) {}

    async register(patient:Patient){
        return await this.patientRepository.save(patient);
    }

    async getPatientByKey(key_string: string){
        const patient = await this.patientRepository
            .createQueryBuilder("patient")
            .select(["patient"])
            .where("key = :key", {key:key_string})
            .getOne()
        
    
        return patient;
    }
    async getAllPatient(){
        return await this.patientRepository
            .createQueryBuilder("patient")
            .where("key = :key", {key:"e1234"})
            .select(["patient"])
            .getOne();
    }

    async getAllPatientRoutines(key_string:string){

        const patient = await this.getPatientByKey(key_string);
        const routines = await this.routinePatientService.getRoutinesByPatientKey(key_string);

        for(let i = 0; i < routines.length; i++){
            console.log(await this.routineResultService.getRoutineResultAndExerciseResult(patient.id, routines[i].id))
        }

        return;
        return await this.patientRepository
            .createQueryBuilder("patient")
            .select(["patient"])
            .leftJoinAndSelect("routine-patient.patient", "patient")
            //.where("patient.key = :key",{key:key_string})
            .getOne();
    }

}
