import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsDate, IsBoolean, IsString } from "class-validator";
import { Routine } from "src/routine/routine.entity";
import { ExerciseResult } from "src/exercise-result/exercise-result.entity";
import { Patient } from "src/patient/patient.entity";

@Entity()
export class RoutinePatient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsBoolean()
    active: boolean;

    @ManyToOne(type => Routine, routine => routine.routineResults)
    routine: Routine;

    @ManyToOne(type => Patient, patient => patient.routines)
    patient: Patient;
}