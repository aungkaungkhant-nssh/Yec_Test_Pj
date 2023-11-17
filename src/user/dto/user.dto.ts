import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserDto{


    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    roles:string


    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
      }
}

export class CreateUserDto{
 

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}