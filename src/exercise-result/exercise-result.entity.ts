import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsArray, IsOptional, IsInt, IsDecimal, IsDate, IsString } from "class-validator";
import { RoutineResult } from "src/routine-result/routine-result.entity";

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

    @Column("int")
    @IsInt()
    total_failures: number;

    @Column("float", { array: true })
    @IsArray()
    time: number[];

    @Column("float", { array: true })
    @IsOptional()
    time_back: number[];

    @Column("float")
    @IsDecimal()
    total_time: number;

    @Column()
    @IsString()
    startAt: string;

    @Column()
    @IsString()
    endAt: string;

    @ManyToOne(type => RoutineResult, routineResult => routineResult.exerciseResult)
    routineResult: RoutineResult;

}