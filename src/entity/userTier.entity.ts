import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
@Entity()
export class UserTier{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tier:string

    @Column({
        default:"pending"
    })
    status:"accept" | "reject" | "pending"

}