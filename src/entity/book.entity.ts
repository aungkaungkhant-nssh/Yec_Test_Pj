import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';

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

    @Column()
    active_status: "draft" | "active"

    @Column()
    free_status:"free" | "premium"

    @OneToMany(() => Chapter, (chapter) => chapter.book)
    chapters : Chapter[]
    
}