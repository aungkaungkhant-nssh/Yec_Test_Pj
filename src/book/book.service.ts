import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entity/book.entity';
import { Repository } from 'typeorm';
import { bookDto } from './dto/bookDto';
import { deleteImage } from 'src/util/deleteImage';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}


    async getBooks(page:number,limit:number){
      return this.bookRepository.find({
        relations:["chapters"],
        take: limit,
        skip: (page - 1) * limit,
      })
      
    }
    async getBook(id:number){
      const book = await this.bookRepository.findOneBy({id});
      if(!book) throw new NotFoundException("Book not found");
      return book;
    }

    createBook(book:bookDto){
      const newBook =   this.bookRepository.create(book);
      return  this.bookRepository.save(newBook);
    }

    
    async deleteBook(id:number){

        const book = await this.bookRepository.findOneBy({id})
        deleteImage(`./${book.image}`)

        return this.bookRepository.delete({id})
    }

    async updateBook(id:number,book:any){
      const findBook = await this.bookRepository.findOneBy({id});

      if(book.image)  deleteImage(`./${findBook.image}`)

      return this.bookRepository.update({id},{...book})
    }
}
