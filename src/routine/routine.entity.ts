import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsInt, IsBoolean, IsDecimal } from "class-validator";

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
}