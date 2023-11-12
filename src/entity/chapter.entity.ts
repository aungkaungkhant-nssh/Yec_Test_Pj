import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { Book } from "./book.entity";

@Entity()

export class Chapter{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    priority:number

    @Column()
    content:string

    @ManyToOne(()=>Book,(book)=>book.chapters)
    book:Book

}