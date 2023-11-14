import { UserTierEnum } from 'src/entity/enum/user_tier.enum';
import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';
@Entity()
export class UserTier{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tier:string

    @Column({ type: 'enum', enum: UserTierEnum, default: UserTierEnum.Pending })
    status:UserTierEnum

}