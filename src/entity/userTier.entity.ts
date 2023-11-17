import { UserTierEnum, UserTierStatusEnum } from 'src/entity/enum/user_tier.enum';
import { Entity, Column, PrimaryGeneratedColumn,  } from 'typeorm';
@Entity()
export class UserTier{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'enum',enum:UserTierEnum,default:UserTierEnum.Free})
    tier:UserTierEnum

    @Column({ type: 'enum', enum: UserTierStatusEnum, default: UserTierStatusEnum.Not })
    status:UserTierStatusEnum

}