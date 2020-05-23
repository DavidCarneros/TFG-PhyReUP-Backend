import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutineResult } from "./routine-result.entity";
import { RoutineResultService } from "./routine-result.service";
import { RoutineResultController } from "./routine-result.controller";
import { ExerciseResultModule } from "src/exercise-result/exercise-result.module";
import { ExerciseResult } from "src/exercise-result/exercise-result.entity";

@Module({
    imports : [
        TypeOrmModule.forFeature([RoutineResult,ExerciseResult]),
        ExerciseResultModule
    ],
    providers: [RoutineResultService],
    exports: [RoutineResultService],
    controllers: [RoutineResultController]
})

export class RotuineResultModule {}