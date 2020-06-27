import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutinePatient } from "./routine-patient.entity";
import { RoutinePatientService } from "./rotuine-patient.service";
import { RoutinePatientController } from "./routine-patient.controller";
import { PatientModule } from "src/patient/patient.module";


@Module({
    imports : [
        TypeOrmModule.forFeature([RoutinePatient]),  forwardRef(() => PatientModule)
    ],
    providers: [RoutinePatientService],
    exports: [RoutinePatientService],
    controllers: [RoutinePatientController]
})

export class RotuinePatientModule {}