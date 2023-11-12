
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';
export const  deleteImage =async (file:string)=>{
    const filePath = `./${file}`

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    await fs.promises.unlink(filePath);//file delete from folder
}