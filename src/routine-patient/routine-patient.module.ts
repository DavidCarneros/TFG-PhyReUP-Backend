import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutinePatient } from "./routine-patient.entity";
import { RoutinePatientService } from "./rotuine-patient.service";
import { RoutinePatientController } from "./routine-patient.controller";


@Module({
    imports : [
        TypeOrmModule.forFeature([RoutinePatient])
    ],
    providers: [RoutinePatientService],
    exports: [RoutinePatientService],
    controllers: [RoutinePatientController]
})

export class RotuinePatientModule {}