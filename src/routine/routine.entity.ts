import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Routine {
    @PrimaryGeneratedColumn()
    id : number;
}