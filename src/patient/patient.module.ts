import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { Patient } from "./patient.entity";
import { RotuinePatientModule } from "src/routine-patient/routine-patient.module";
import { RotuineResultModule } from "src/routine-result/routine-result.module";

@Module({
    imports : [
        TypeOrmModule.forFeature([Patient]), forwardRef(() => RotuinePatientModule), forwardRef(() => RotuineResultModule)
    ],
    providers: [PatientService],
    exports: [PatientService],
    controllers: [PatientController]
})

export class PatientModule {}
