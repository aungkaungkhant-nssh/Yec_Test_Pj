import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/entity/chapter.entity';
import { Repository } from 'typeorm';
import { chapterDto } from './dto/chapterDto';
import { Book } from 'src/entity/book.entity';

@Injectable()
export class ChapterService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,

        @InjectRepository(Chapter)
        private chapterRepository: Repository<Chapter>,
    ){}

    getChapters(){
       return this.chapterRepository.find({relations:["book"]})
    }

    async createChapter(chapter:any){
  
       const book =await  this.bookRepository.findOneBy({id:chapter.bookId})
        if(!book) throw new NotFoundException("Book not found");
        
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
