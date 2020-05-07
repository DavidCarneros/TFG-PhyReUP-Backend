import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsArray, IsOptional, IsInt, IsDecimal, IsDate } from "class-validator";

@Entity()
export class ExerciseResult {
    @PrimaryGeneratedColumn()
    id : number;

    @IsArray()
    @Column("int", { array: true })
    failures : number[];

    @Column("int", { array: true })
    @IsOptional()
    @IsArray()
    failures_back : number[];

    @Column()
    @IsInt()
    total_failures: number;

    @Column("float", { array: true })
    @IsArray()
    time: number[];

    @Column("float", { array: true })
    @IsOptional()
    time_back: number[];

    @Column()
    @IsDecimal()
    total_time: number;

    @Column()
    @IsDate()
    startAt: Date;

    @Column()
    @IsDate()
    endAt: Date;
}