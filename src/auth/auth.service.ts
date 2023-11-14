import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from "argon2";
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){

    }
    async signUp(email:string,password:string){
    
        const hashPassword = await  argon2.hash(password);
        const newUser =  this.userRepository.create({email:email,password:hashPassword});
        return this.userRepository.save(newUser)
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
