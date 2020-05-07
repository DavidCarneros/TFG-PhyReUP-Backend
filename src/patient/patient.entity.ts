import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id : number;

    @IsEmail()
    @Column()
    email: string;


}