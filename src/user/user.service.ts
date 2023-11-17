import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { UserTier } from 'src/entity/userTier.entity';
import { UserTierEnum, UserTierStatusEnum } from '../entity/enum/user_tier.enum';
import { UserRole } from 'src/entity/enum/user_role.enum';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(UserTier)
        private userTierRepository: Repository<UserTier>
    ){}

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

    // user request to admin upgrade tier
    async upgradeTierReq(id:number){
        const {password,...user} =  await this.userRepository.findOneBy({id});
        if(!user) throw new NotFoundException("User not found");
         const newTier =  this.userTierRepository.create({status:UserTierStatusEnum.Pending,tier:UserTierEnum.Premium});
         const saveTier = await this.userTierRepository.save(newTier);
         user.tier = saveTier;
         return new UserDto(await this.userRepository.save(user))
    }


    // upgrade tier req list show by admin
    upgradeTierList(){
       return  this.userRepository.createQueryBuilder('user')
       .leftJoinAndSelect('user.tier', 'tier')
   
       .where('tier.status IS NOT NULL AND tier.status != :status', { status: 'not' })
       .getMany();;
    }


    async upgradeTierRes(id:number,status:UserTierStatusEnum){
        const user =  await this.userRepository.find({where:{id},relations:["tier"]});
     
        if(!user) throw new NotFoundException("User not found");

        const tierId = user[0].tier.id;
       return this.userTierRepository.update({id:tierId},{status})
        
    }





}
