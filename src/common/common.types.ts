import { IsInt, IsDecimal } from 'class-validator';

export class Vector3 {

    @IsDecimal()
    x: number;

    @IsDecimal()
    y: number;

    @IsDecimal()
    z: number;
}

export enum Hand {
    left  = "left",
    right = "right"
}