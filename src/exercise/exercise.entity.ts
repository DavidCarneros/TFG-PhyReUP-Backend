import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Vector3, Hand } from "src/common/common.types";
import { IsOptional, IsUrl, IsDecimal, IsString, IsBoolean, IsInt } from "class-validator";


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

//    @IsOptional()
//    @Column()
//    @IsString()
//    description: string;

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

}