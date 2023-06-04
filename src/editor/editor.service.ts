import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUpdateDto } from "src/admin/adminupdatedto.dto";
import { Repository } from 'typeorm';
import { EditorDto } from "./editordto.dto";
import { EditorEntity } from "./editorentity.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class EditorService {
    constructor(
        @InjectRepository(EditorEntity)
        private editorRepo: Repository<EditorEntity>,
      ) {}

      getEditorByID(id):any {
        return this.editorRepo.findOneBy({ id });
    }
    
    getEditorByIDName():any {
        return this.editorRepo.find();
    }

    insertEditor(mydto:EditorDto):any {
        const editoraccount = new EditorEntity()
        editoraccount.name = mydto.name;
        editoraccount.contact = mydto.contact;
        editoraccount.email = mydto.email;
        editoraccount.address = mydto.address;
        editoraccount.filename = mydto.filename;
       return this.editorRepo.save(editoraccount);
          }
    
          async inserteditor(mydto) {
            const salt = await bcrypt.genSalt();
            const hassedpassed = await bcrypt.hash(mydto.password, salt);
            mydto.password= hassedpassed;
            return this.editorRepo.save(mydto);
            }
      
      updateEditor(name: string,id: any):any {
        console.log(name+id);
        return this.editorRepo.update(id,{name:name});
        }
 
    updateEditorbyid(mydto:AdminUpdateDto,id):any {
        return this.editorRepo.update(id,mydto);
           }

           deleteEditorbyid(id):any {
    
            return this.editorRepo.delete(id);
        }

    }