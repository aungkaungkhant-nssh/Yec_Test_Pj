import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entity/book.entity';
import { Chapter } from 'src/entity/chapter.entity';
import { ChapterController } from './chapter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book,Chapter])],
  providers: [ChapterService],
  controllers: [ChapterController]
})
export class ChapterModule {}
