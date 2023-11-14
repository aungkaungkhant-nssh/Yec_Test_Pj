import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from 'src/entity/chapter.entity';
import { UserTier } from 'src/entity/userTier.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports:[
    TypeOrmModule.forFeature([User,Chapter,UserTier]),
    AuthModule

  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class UserModule {}
