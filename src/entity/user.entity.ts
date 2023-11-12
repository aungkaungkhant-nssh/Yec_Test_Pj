import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserTier } from './userTier.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    email:string

    @Column()
    password:string

    @OneToOne(()=> UserTier)
    @JoinColumn()
    tier: UserTier;

  
}

