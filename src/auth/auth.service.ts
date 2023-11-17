import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from "argon2";
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from '../user/dto/user.dto';
import { UserTier } from 'src/entity/userTier.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserTier)
        private userTierRepository:Repository<UserTier>
    ){

    }
    async signUp(userDto:CreateUserDto){
        const hashPassword = await  argon2.hash(userDto.password);
        let newUser =  this.userRepository.create({email:userDto.email,password:hashPassword});
        let saveUser =  await this.userRepository.save(newUser);
        const newTier = this.userTierRepository.create()
        await this.userTierRepository.save(newTier);
        saveUser.tier = newTier;
        await this.userRepository.save(saveUser)
        return saveUser
     }

     async signIn(email:string,password:string){
        const user = await this.userRepository.findOneBy({email})
        if(!user) throw new UnauthorizedException();
        
        const isMatchPassword=  await argon2.verify(user.password,password);

        if(!isMatchPassword) throw new UnauthorizedException();

        const payload = {sub:user.id,email:user.email};
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
        
    }
}
