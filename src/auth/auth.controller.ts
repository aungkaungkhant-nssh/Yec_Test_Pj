import { Body, ClassSerializerInterceptor, Controller,Post, UseInterceptors } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){

    }


    @Post("/signup")
    signUp(@Body() userDto:CreateUserDto){
     return  this.authService.signUp(userDto)  
    }


    @Post("/signin")
    signIn(@Body() userDto:CreateUserDto){
     
        return  this.authService.signIn(userDto.email,userDto.password)  
    }

}
