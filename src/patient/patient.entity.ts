import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsEmail, IsString } from "class-validator";
import { Routine } from "src/routine/routine.entity";

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

    @OneToMany(type => Routine, routine => routine.patient)
    routines: Routine[];

}