import { Controller, Get, Param } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {

    constructor(
        private readonly patientService: PatientService
    ){}

    @Get()
    async getAll(){
        return await this.patientService.getAllPatient();
    }

    @Get('evaluate/:key')
    async evaluatePatient(@Param() param){
        return await this.patientService.getAllPatientRoutines(param.key);
    }

}
