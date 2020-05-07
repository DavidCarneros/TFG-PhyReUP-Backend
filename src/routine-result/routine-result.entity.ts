import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDate, IsBoolean } from "class-validator";

@Entity()
export class RoutineResult {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsDate()
    startDate: Date;

    @Column()
    @IsDate()
    endDate: Date;

    @Column()
    @IsBoolean()
    complete: boolean;

    @Column()
    @IsBoolean()
    problems: boolean;
}