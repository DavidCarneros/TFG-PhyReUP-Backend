import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {

    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>
    ) {}

    async register(patient:Patient){
        return await this.patientRepository.save(patient);
    }

    async getPatientByKey(key: string){
        return await this.patientRepository
            .createQueryBuilder("patient")
            .select(["patient"])
            .where(" key = :key",{key:key})
            .getOne();
    }


}
