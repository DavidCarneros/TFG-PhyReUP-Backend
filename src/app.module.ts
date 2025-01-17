import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseResultModule } from './exercise-result/exercise-result.module';
import { PatientModule } from './patient/patient.module';
import { RoutineModule } from './routine/routine.module';
import { RoutineResultController } from './routine-result/routine-result.controller';
import { RoutineResultService } from './routine-result/routine-result.service';
import { RotuineResultModule } from './routine-result/routine-result.module';
import { RotuinePatientModule } from './routine-patient/routine-patient.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ExerciseModule,
    RotuineResultModule,
    ExerciseResultModule,
    PatientModule,
    RoutineModule,
    RotuinePatientModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
