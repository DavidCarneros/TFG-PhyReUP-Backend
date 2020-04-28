import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id : number;
}