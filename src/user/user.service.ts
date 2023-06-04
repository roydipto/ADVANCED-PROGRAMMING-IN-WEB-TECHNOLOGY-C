import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUpdateDto } from "src/admin/adminupdatedto.dto";
import { Repository } from 'typeorm';
import { UserDto } from "./userdto.dto";
import { UserEntity } from "./userentity.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
      ) {}

      getUserByID(id):any {
        return this.userRepo.findOneBy({ id });
    }
    
    getUserByIDName():any {
        return this.userRepo.find();
    }

    insertUser(mydto:UserDto):any {
        const useraccount = new UserEntity()
        useraccount.name = mydto.name;
        useraccount.contact = mydto.contact;
        useraccount.email = mydto.email;
        useraccount.address = mydto.address;
        useraccount.filename = mydto.filename;
       return this.userRepo.save(useraccount);
          }
    
          async insertuser(mydto) {
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(mydto.password, salt);
            mydto.password= hassedpassed;
            return this.userRepo.save(mydto);
            }
      
      updateUser(name: string,id: any):any {
        console.log(name+id);
        return this.userRepo.update(id,{name:name});
        }

    updateUserbyid(mydto:AdminUpdateDto,id):any {
        return this.userRepo.update(id,mydto);
           }

           deleteUserbyid(id):any {
    
            return this.userRepo.delete(id);
        }

    }