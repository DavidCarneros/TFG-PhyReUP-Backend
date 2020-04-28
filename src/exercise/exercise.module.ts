import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseService } from "./exercise.service";
import { ExerciseController } from "./exercise.controller";
import { Exercise } from "./exercise.entity";

@Module({
    imports : [
      TypeOrmModule.forFeature([Exercise])
    ],
    providers: [ExerciseService],
    exports: [ExerciseService],
    controllers: [ExerciseController]
})

export class ExerciseModule {}
