import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutineResult } from "./routine-result.entity";
import { RoutineResultService } from "./routine-result.service";
import { RoutineResultController } from "./routine-result.controller";
import { ExerciseResultModule } from "src/exercise-result/exercise-result.module";
import { ExerciseResult } from "src/exercise-result/exercise-result.entity";
import { PatientModule } from "src/patient/patient.module";

@Module({
    imports : [
        TypeOrmModule.forFeature([RoutineResult,ExerciseResult]),
        ExerciseResultModule,
        forwardRef(() => PatientModule)
    ],
    providers: [RoutineResultService],
    exports: [RoutineResultService],
    controllers: [RoutineResultController]
})

export class RotuineResultModule {}