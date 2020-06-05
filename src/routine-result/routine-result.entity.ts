import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsDate, IsBoolean, IsString } from "class-validator";
import { Routine } from "src/routine/routine.entity";
import { ExerciseResult } from "src/exercise-result/exercise-result.entity";
import { Patient } from "src/patient/patient.entity";

@Entity()
export class RoutineResult {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsString()
    startDate: string;

    @Column()
    @IsString()
    endDate: string;

    @Column()
    @IsBoolean()
    complete: boolean;

    @Column()
    @IsBoolean()
    problems: boolean;

    @ManyToOne(type => Routine, routine => routine.routineResults)
    routine: Routine;

    @ManyToOne(type => Patient, patient => patient.routineResults)
    patient: Patient;

    @OneToMany(type => ExerciseResult, exerciseResult => exerciseResult.routineResult)
    exerciseResult: ExerciseResult[];
}