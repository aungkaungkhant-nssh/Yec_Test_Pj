import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from 'src/entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from 'src/entity/chapter.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Book,Chapter])],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
