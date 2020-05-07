import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoutineResult } from "./routine-result.entity";
import { RoutineResultService } from "./routine-result.service";
import { RoutineResultController } from "./routine-result.controller";

@Module({
    imports : [
        TypeOrmModule.forFeature([RoutineResult])
    ],
    providers: [RoutineResultService],
    exports: [RoutineResultService],
    controllers: [RoutineResultController]
})

export class RotuineResultModule {}