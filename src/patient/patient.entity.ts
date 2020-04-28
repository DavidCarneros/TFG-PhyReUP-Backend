import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id : number;
}