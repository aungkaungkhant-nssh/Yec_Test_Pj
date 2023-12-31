import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from 'src/entity/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from 'src/entity/chapter.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([Book,Chapter]),AuthModule],
  providers: [BookService],
  controllers: [BookController],
  exports:[BookService]
})
export class BookModule {}
