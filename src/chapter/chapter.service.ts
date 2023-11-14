import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/entity/chapter.entity';
import { Repository } from 'typeorm';
import { chapterDto } from './dto/chapterDto';
import { Book } from 'src/entity/book.entity';
import { BookService } from 'src/book/book.service';

@Injectable()
export class ChapterService {
    constructor(

        @InjectRepository(Chapter)
        private chapterRepository: Repository<Chapter>,
        private bookService:BookService
    ){}

    async getChapters(bookId:number){
       return await this.chapterRepository.find({
        where: {
          book: { id: bookId },
        },
        relations: ["book"],
      });
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
