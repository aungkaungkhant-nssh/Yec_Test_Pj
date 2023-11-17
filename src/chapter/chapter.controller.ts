import { Controller, Post,Body, Delete, Param, ParseIntPipe,Get, UseGuards,Req } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { chapterDto } from './dto/chapterDto';
import { UserRole } from 'src/entity/enum/user_role.enum';
import { Roles } from 'src/auth/roles.docorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('chapter')
export class ChapterController {
    constructor(
        private chapterService:ChapterService
    ){}

    // @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard)
    @Get("/book/:bookId")
    getChapters(@Param("bookId",ParseIntPipe) bookId:number,@Req() req:any){
    
          return this.chapterService.getChapters(bookId,req.user);
    }


    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Post()
    createChapter(@Body() chapter:chapterDto){
       return this.chapterService.createChapter(chapter)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete(":id")
    deleteChapter(@Param("id",ParseIntPipe) id:number){
        return this.chapterService.deleteChapter(id)
    }

}
