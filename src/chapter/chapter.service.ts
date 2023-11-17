import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/entity/chapter.entity';
import { Repository } from 'typeorm';
import { chapterDto } from './dto/chapterDto';
import { Book } from 'src/entity/book.entity';
import { BookService } from 'src/book/book.service';
import { FreeStatusEnum } from 'src/entity/enum/status.enum';
import { UserTierEnum, UserTierStatusEnum } from 'src/entity/enum/user_tier.enum';

@Injectable()
export class ChapterService {
    constructor(

        @InjectRepository(Chapter)
        private chapterRepository: Repository<Chapter>,
        private bookService:BookService
    ){}

    async getChapters(bookId:number,user:any){
      const book = await this.bookService.getBook(bookId);
   
      const bookAndUserPremium = user.roles === "admin" ? true :  book.free_status===FreeStatusEnum.Free || (book.free_status === FreeStatusEnum.Premium && user.tier.tier === UserTierEnum.Premium && user.tier.status === UserTierStatusEnum.Accept);

      if(bookAndUserPremium){
        return await this.chapterRepository.find({
          where: {
            book: { id: bookId },
          },
          relations: ["book"],
        });
      }
      return [];
    }

    async createChapter(chapter:any){
       const book = await this.bookService.getBook(chapter.bookId)
       const newChapter =  this.chapterRepository.create({
        title:chapter.title,
        priority:chapter.priority,
        content:chapter.content
       });
       return  await this.chapterRepository.save({...newChapter,book});
    }

    async deleteChapter(id:number){
        return this.chapterRepository.delete({id})
    }
}
