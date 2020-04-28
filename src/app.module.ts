import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseResultModule } from './exercise-result/exercise-result.module';
import { PatientModule } from './patient/patient.module';
import { RoutineModule } from './routine/routine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ExerciseModule,
    ExerciseResultModule,
    PatientModule,
    RoutineModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
