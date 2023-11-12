import { IsNotEmpty, IsString } from "class-validator"

export class bookDto{
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsNotEmpty()
    image:string

    @IsString()
    @IsNotEmpty()
    author:string

    @IsString()
    @IsNotEmpty()
    duration:string

    @IsString()
    @IsNotEmpty()
    active_status:"draft"|"active"

    @IsString()
    @IsNotEmpty()
    free_status:"free"|"premium"
}