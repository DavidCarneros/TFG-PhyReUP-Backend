import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsInt, IsBoolean, IsDecimal } from "class-validator";
import { Exercise } from "src/exercise/exercise.entity";
import { Patient } from "src/patient/patient.entity";
import { RoutineResult } from "src/routine-result/routine-result.entity";

@Entity()
export class Routine {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    @IsInt()
    repetitions: number;

    @Column()
    @IsBoolean()
    active: boolean;

    @IsDecimal()
    @Column()
    accuracy: number;

    @ManyToOne(type => Exercise, exercise => exercise.routines)
    exercise: Exercise;

    @ManyToOne(type => Patient, patient => patient.routines)
    patient: Patient;

    @OneToMany(type => RoutineResult, routineResult => routineResult.routine)
    routineResults: RoutineResult[];
}