import { Body, ClassSerializerInterceptor, Controller,Post, SerializeOptions, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){

    }


    @Post("/signup")
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        groups:["GROUP_ALL_USERS"]
    })
    signUp(@Body() userDto:CreateUserDto){
     return  this.authService.signUp(userDto)  
    }


    @Post("/signin")
    signIn(@Body() userDto:CreateUserDto){
     
        return  this.authService.signIn(userDto.email,userDto.password)  
    }

}
