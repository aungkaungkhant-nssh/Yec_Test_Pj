import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';
import { ActiveStatusEnum, FreeStatusEnum } from './enum/status.enum';

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    image:string

    @Column()
    author:string

    @Column() 
    duration:string

    @Column({
        type:"enum",
        enum:ActiveStatusEnum, 
    })
    active_status: ActiveStatusEnum

    @Column({
        type:"enum",
        enum:FreeStatusEnum
    })
    free_status:FreeStatusEnum

    @OneToMany(() => Chapter, (chapter) => chapter.book)
    chapters : Chapter[]
    
}