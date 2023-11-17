import { Body, Controller,Param,ParseIntPipe,Post,Get,Put, UseGuards,Request, UseInterceptors, ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from 'src/entity/enum/user_role.enum';
import { Roles } from '../auth/roles.docorator';
import { JwtGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService

    ){}


    @Roles(UserRole.USER)
    @UseGuards(JwtGuard,RolesGuard)
    @Post(":id/upgradeReq")
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        groups:["GROUP_ALL_USERS"]
    })
    upgradeTierReq(@Param("id",ParseIntPipe) id:number, @Body() body:any){
        return this.userService.upgradeTierReq(id)
    }

  

  
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Get("/tiers")
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        groups:["GROUP_ALL_USERS"]
    })
    upgradeTierList(@Request() req:any){
        return this.userService.upgradeTierList()
    }

    @Roles(UserRole.ADMIN)
    @Put(":id/upgradeRes")
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        groups:["GROUP_ALL_USERS"]
    })
    upgradeTierRes(@Param("id",ParseIntPipe) id:number, @Body() body:any){
        this.userService.upgradeTierRes(id,body.status)
    }
    

    
}
