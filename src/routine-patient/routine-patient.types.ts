import { IsInt, IsIn, IsBoolean, IsString } from "class-validator";
import { Routine } from "src/routine/routine.entity";

export class RoutinePatientBody{

    patient: string;

    routine: Routine;

    active:boolean;

}