import { Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors,Put,Query, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Roles } from 'src/auth/roles.docorator';
import { UserRole } from 'src/entity/enum/user_role.enum';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('book')
export class BookController {
    constructor(
        private bookService :BookService
    ){}


    
    @Get()
    getAllBooks(@Query() query:any)
    {
        return this.bookService.getBooks(query)
    }


    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Post()
    @UseInterceptors(
    FileInterceptor('file', { storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileName = `${unique}-${file.originalname}`;
            callback(null, fileName);
        },
        })}
    )
    )
    createBook(@UploadedFile() file: Express.Multer.File,@Body() book:any){
       return this.bookService.createBook({image:file.path,...book})
    }


    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Delete(":id")
    deleteBook(@Param("id",ParseIntPipe) id:number){
        return this.bookService.deleteBook(id)
    }

    @Get(":id")
    getBook(@Param("id",ParseIntPipe) id:number){
        return this.bookService.getBook(id)
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtGuard,RolesGuard)
    @Put(":id")
    @UseInterceptors(
        FileInterceptor('file', { storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const fileName = `${unique}-${file.originalname}`;
                callback(null, fileName);
            },
            })}
        )
    )
    updateBook(@UploadedFile() file,@Param("id",ParseIntPipe) id:number,@Body() body:any){
        const book = {...body};
        if(file) book.image = file.path;
        return  this.bookService.updateBook(id,book)
    }   
}
