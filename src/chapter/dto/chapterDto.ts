import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class chapterDto{
    @IsNumber()
    @IsNotEmpty()
    bookId:number

    
    @IsString()
    @IsNotEmpty()
    title:string

    @IsNumber()
    @IsNotEmpty()
    priority:number

    @IsString()
    @IsNotEmpty()
    content:string

}