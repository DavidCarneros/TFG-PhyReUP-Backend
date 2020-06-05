import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vector3, Hand } from "src/common/common.types";
import { IsOptional, IsUrl, IsDecimal, IsString, IsBoolean, IsInt } from "class-validator";
import { Routine } from "src/routine/routine.entity";


@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    @IsInt()
    keyPoint: number;

    @Column()
    @IsString()
    name: string;

    @IsUrl()
    @IsOptional()
    @Column()
    videoUrl : string;

  //  @Column("simple-json", { array: true })
    @Column("json")
    points: Vector3[]

    @Column()
    hand: Hand;

    @Column()
    @IsBoolean()
    back: boolean;


    @OneToMany(type => Routine, routine => routine.exercise)
    routines: Routine[];


}