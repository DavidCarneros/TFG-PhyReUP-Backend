import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseResultModule } from './exercise-result/exercise-result.module';
import { PatientModule } from './patient/patient.module';
import { RoutineModule } from './routine/routine.module';
import { RoutineResultController } from './routine-result/routine-result.controller';
import { RoutineResultService } from './routine-result/routine-result.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ExerciseModule,
    ExerciseResultModule,
    PatientModule,
    RoutineModule
  ],
  controllers: [RoutineResultController],
  providers: [RoutineResultService],
})
export class AppModule {}
