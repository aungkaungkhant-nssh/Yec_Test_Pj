import { Body, Controller,Post } from '@nestjs/common';
import { userDto } from './dto/userDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){

    }
    @Post("/signup")
    signUp(@Body() userDto:userDto){
 
     return  this.authService.signUp(userDto.email,userDto.password)  
    }


    @Post("/signin")
    signIn(@Body() userDto:userDto){
        return  this.authService.signIn(userDto.email,userDto.password)  
    }

}