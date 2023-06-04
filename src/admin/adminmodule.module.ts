import { Module } from '@nestjs/common';
import { AdminController } from "./admin.controller"
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { AuthorEntity } from '../author/authorentity.entity';
import { AuthorService } from 'src/author/author.service';
import { EditorEntity } from 'src/editor/editorentity.entity';
import { EditorService } from 'src/editor/editor.service';
import { UserEntity } from 'src/user/userentity.entity';
import { UserService } from 'src/user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({

imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                    //user: 'dipto.roy.aiub@gmail.com',
                       pass: ''
                   },
                  }
      }),
      
      TypeOrmModule.forFeature([AdminEntity, AuthorEntity, EditorEntity, UserEntity])],
controllers: [AdminController],
providers: [AdminService, AuthorService, EditorService, UserService],

})

export class AdminModule{}