import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseResult } from "./exercise-result.entity";
import { ExerciseResultService } from "./exercise-result.service";
import { ExerciseResultController } from "./exercise-result.controller";

@Module({
    imports : [
      TypeOrmModule.forFeature([ExerciseResult])
    ],
    providers: [ExerciseResultService],
    exports: [ExerciseResultService],
    controllers: [ExerciseResultController]
})

export class ExerciseResultModule {}
