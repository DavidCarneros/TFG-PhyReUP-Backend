import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsEmail, IsString } from "class-validator";
import { Routine } from "src/routine/routine.entity";
import { RoutinePatient } from "src/routine-patient/routine-patient.entity";
import { RoutineResult } from "src/routine-result/routine-result.entity";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id : number;

    @IsEmail()
    @Column()
    email: string;

    @IsString()
    @Column()
    key: string;

    @OneToMany(type => RoutinePatient, routinePatient => routinePatient.patient)
    routines: RoutinePatient[];

    @OneToMany(type => RoutineResult, routineResult => routineResult.patient)
    routineResults: RoutineResult[];

}