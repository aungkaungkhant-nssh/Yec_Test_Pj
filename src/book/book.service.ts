import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entity/book.entity';
import { Repository } from 'typeorm';
import { deleteImage } from 'src/util/deleteImage';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ){}


    async getBooks({limit="2",page="1",title="",author=""}:any){

      const queryBuilder =   this.bookRepository.createQueryBuilder("books")

      if(title) queryBuilder.where("books.title Like :searchTerm",{ searchTerm: `%${title}%` })
      if(author) queryBuilder.where("books.author Like :searchTerm",{ searchTerm: `%${author}%` })

      return await queryBuilder
      .leftJoinAndSelect("books.chapters","chapter")
      .skip((parseInt(page) - 1) * parseInt(page))
      .take(+limit)
     
      .getManyAndCount();
      
      
    }
    async getBook(id:number){
      return  await this.bookRepository.findOneByOrFail({id});
    }

    createBook(book:any){
      const newBook =   this.bookRepository.create(book);
      return  this.bookRepository.save(newBook);
    }

    
    async deleteBook(id:number){

        const book = await this.bookRepository.findOneByOrFail({id})
        deleteImage(`./${book.image}`)

        return this.bookRepository.delete({id})
    }

    async updateBook(id:number,book:any){
      const findBook = await this.bookRepository.findOneBy({id});

      if(book.image)  deleteImage(`./${findBook.image}`)

      return this.bookRepository.update({id},{...book})
    }
}
