import { Controller, Post,Body, Delete, Param, ParseIntPipe,Get } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { chapterDto } from './dto/chapterDto';

@Controller('chapter')
export class ChapterController {
    constructor(
        private chapterService:ChapterService
    ){}

    @Get()
    getChapters(){
        return this.chapterService.getChapters();
    }

    @Post()
    createChapter(@Body() chapter:chapterDto){
       return this.chapterService.createChapter(chapter)
    }

    @Delete(":id")
    deleteChapter(@Param("id",ParseIntPipe) id:number){
        return this.chapterService.deleteChapter(id)
    }

}
