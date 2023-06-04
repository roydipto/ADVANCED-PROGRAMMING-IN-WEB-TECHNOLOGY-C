import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUpdateDto } from "src/admin/adminupdatedto.dto";
import { Repository } from 'typeorm';
import { AuthorDto } from "./authordto.dto";
import { AuthorEntity } from "./authorentity.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity)
        private authorRepo: Repository<AuthorEntity>,
      ) {}

      getAuthorByID(id):any {
        return this.authorRepo.findOneBy({ id });
    }
    
    getAuthorByIDName():any {
        return this.authorRepo.find();
    }

insertAuthor(mydto:AuthorDto):any {
    const authoraccount = new AuthorEntity()
    authoraccount.name = mydto.name;
    authoraccount.contact = mydto.contact;
    authoraccount.email = mydto.email;
    authoraccount.address = mydto.address;
    authoraccount.filename = mydto.filename;
   return this.authorRepo.save(authoraccount);
      }

      async insertauthor(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.authorRepo.save(mydto);
        }
      
      updateAuthor(name: string,id: any):any {
        console.log(name+id);
        return this.authorRepo.update(id,{name:name});
        }

    updateAuthorbyid(mydto:AdminUpdateDto,id):any {
        return this.authorRepo.update(id,mydto);
           }

           deleteAuthorbyid(id):any {
    
            return this.authorRepo.delete(id);
        }
    }