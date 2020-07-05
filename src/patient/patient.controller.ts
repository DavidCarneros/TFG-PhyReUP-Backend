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
        const patientKey = param.key.slice(0,-1);
        console.log(patientKey);
        return await this.patientService.evaluateAllRoutinesByKey(patientKey);
    }

}
