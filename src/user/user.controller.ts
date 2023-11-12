import { Body, Controller,Param,ParseIntPipe,Post,Get,Put } from '@nestjs/common';
import { userDto } from './dto/userDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService

    ){}

    @Post("/signup")
    signUp(@Body() userDto:userDto){
     return  this.userService.signUp(userDto.email,userDto.password)  
    }

    @Post("/signin")
    signIn(@Body() userDto:userDto){
     return  this.userService.signIn(userDto.email,userDto.password)  
    }

    @Post(":id/upgradeReq")
    upgradeTierReq(@Param("id",ParseIntPipe) id:number, @Body() body:any){
        return this.userService.upgradeTierReq(id,body.tier)
    }

    @Get("/tiers")
    upgradeTierList(){
        return this.userService.upgradeTierList()
    }

    @Put(":id/upgradeRes")
    upgradeTierRes(@Param("id",ParseIntPipe) id:number, @Body() body:any){
        this.userService.upgradeTierRes(id,body.status)
    }
    

    
}
