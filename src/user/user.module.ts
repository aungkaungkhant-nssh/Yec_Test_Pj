import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Chapter } from 'src/entity/chapter.entity';
import { UserTier } from 'src/entity/userTier.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Chapter,UserTier]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),

  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
