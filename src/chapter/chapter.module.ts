import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entity/book.entity';
import { Chapter } from 'src/entity/chapter.entity';
import { ChapterController } from './chapter.controller';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book,Chapter]),BookModule],
  providers: [ChapterService],
  controllers: [ChapterController]
})
export class ChapterModule {}
