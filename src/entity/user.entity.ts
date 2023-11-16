import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserTier } from './userTier.entity';
import { UserRole } from './enum/user_role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    email:string

  
    @OneToOne(()=> UserTier)
    @JoinColumn()
    tier: UserTier;

  
    @Column({
        type:"enum",
        enum:UserRole, 
        default:UserRole.USER
    })
    roles:UserRole

    @Exclude()
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
  
}

