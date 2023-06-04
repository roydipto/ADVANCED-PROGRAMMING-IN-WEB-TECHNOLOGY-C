import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDto } from './admindto.dto';
import { AdminEntity } from './adminentity.entity';
import * as bcrypt from 'bcrypt';
import { AdminUpdateDto } from './adminupdatedto.dto';
import { MailerService } from "@nestjs-modules/mailer/dist";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService
        ) {}

getIndex():any { 
    return this.adminRepo.find();

}
getAdminByID(id):any {
    return this.adminRepo.findOneBy({ id });
}

getImageByID(name):any {
    return this.adminRepo.findOneBy({ name });
}

getAdminByIDName():any {
    return this.adminRepo.find();
}

insertAdmin(mydto:AdminDto):any {
    const adminaccount = new AdminEntity()
    adminaccount.name = mydto.name;
    adminaccount.contact = mydto.contact;
    adminaccount.email = mydto.email;
    adminaccount.password = mydto.password;
    adminaccount.address = mydto.address;
    adminaccount.filename = mydto.filename;
   return this.adminRepo.save(adminaccount);
      } 

      updateAdmin(name: string,id: any):any {
        console.log(name+id);
        return this.adminRepo.update(id,{name:name});
        }
    updateAdminbyid(mydto:AdminUpdateDto,id):any {
        return this.adminRepo.update(id,mydto);
           }

           deleteAdminbyid(id):any {
    
            return this.adminRepo.delete(id);
        }

      async signup(mydto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.password, salt);
        mydto.password= hassedpassed;
        return this.adminRepo.save(mydto);
        }
        
        async signin(mydto){
   
            if (mydto.email != null && mydto.password != null) {
                const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
                const isMatch = await bcrypt.compare(mydto.password, mydata.password);
                if (isMatch) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        }

        async sendEmail(to: string, subject: string, text:string): Promise<void>{
                   await this.mailerService.sendMail({
                   to: to,
                   subject: subject,
                   text: text, 
                 });
           
           }
}

