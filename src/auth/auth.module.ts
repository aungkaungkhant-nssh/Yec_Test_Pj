import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt'

import { JwtGuard } from './jwt.guard';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
@Module({
  imports:[
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtGuard,
  ],

  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
