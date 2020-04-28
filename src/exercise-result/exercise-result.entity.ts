import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExerciseResult {
    @PrimaryGeneratedColumn()
    id : number;
}