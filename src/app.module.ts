import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { BookModule } from './book/book.module';
import { MulterModule } from '@nestjs/platform-express';
import { Book } from './entity/book.entity';
import { ChapterController } from './chapter/chapter.controller';
import { ChapterModule } from './chapter/chapter.module';
import { Chapter } from './entity/chapter.entity';
import { UserTier } from './entity/userTier.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'yec',
      entities: [User,Book,Chapter,UserTier],
      synchronize: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    UserModule,
    BookModule,
    ChapterModule,
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
