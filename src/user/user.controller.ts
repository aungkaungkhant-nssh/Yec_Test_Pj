import { Body, Controller,Param,ParseIntPipe,Post,Get,Put, UseGuards,Request } from '@nestjs/common';
import { userDto } from './dto/userDto';
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
    upgradeTierReq(@Param("id",ParseIntPipe) id:number, @Body() body:any){
        return this.userService.upgradeTierReq(id,body.tier)
    }

  

  
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Get("/tiers")
    upgradeTierList(@Request() req:any){
        return this.userService.upgradeTierList()
    }

    @Roles(UserRole.ADMIN)
    @Put(":id/upgradeRes")
    upgradeTierRes(@Param("id",ParseIntPipe) id:number, @Body() body:any){
        this.userService.upgradeTierRes(id,body.status)
    }
    

    
}
