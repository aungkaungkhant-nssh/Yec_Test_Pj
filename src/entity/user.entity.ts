import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserTier } from './userTier.entity';
import { UserRole } from './enum/user_role.enum';
import { Expose } from 'class-transformer';


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    @Expose({groups:["GROUP_ADMIN","GROUP_ALL_USERS"]})
    id:number

    @Column({unique:true})
    @Expose({groups:["GROUP_ADMIN","GROUP_ALL_USERS"]})
    email:string

  
    @OneToOne(()=> UserTier)
    @Expose({groups:["GROUP_ADMIN","GROUP_ALL_USERS"]})
    @JoinColumn()
    tier: UserTier;

    @Column()
    @Expose({groups:["SUPER_ADMIN"]})
    password: string;

    
    @Column({
        type:"enum",
        enum:UserRole, 
        default:UserRole.USER
    })
    @Expose({groups:["GROUP_ADMIN","GROUP_ALL_USERS"]})
    roles:UserRole

  
}

