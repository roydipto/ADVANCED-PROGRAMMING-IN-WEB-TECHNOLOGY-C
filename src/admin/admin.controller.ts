import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './adminservice.service';
import { AdminDto } from './admindto.dto';
import { AuthorService } from 'src/author/author.service';
import { AuthorDto } from 'src/author/authordto.dto';
import { EditorService } from 'src/editor/editor.service';
import { EditorDto } from 'src/editor/editordto.dto';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/userdto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminUpdateDto } from './adminupdatedto.dto';
import { SessionGuard } from './session.guard';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService,
        private authorService: AuthorService,
        private editorService: EditorService,
        private userService: UserService
        ) {}

            @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }

        @Get('/index')
        getAdmin(): any {
          return this.adminService.getIndex();
        }
        
        @Get('/findadmin')
        getAdminByIDName(): any {
          return this.adminService.getAdminByIDName();
        }

        @Get('/findadmin/:id')
        getAdminByID(@Param('id', ParseIntPipe) id: number): any {
          return this.adminService.getAdminByID(id);
        }
      
        @Post('/insertadmin')
      @UsePipes(new ValidationPipe())
        insertAdmin(@Body() mydto: AdminDto): any {
          return this.adminService.insertAdmin(mydto);
        }

        @Put('/updateadmin/')
        // @UseGuards(SessionGuard)
        @UsePipes(new ValidationPipe())
        updateAdmin(@Session() session,@Body('name') name: string, @Body('id') id: string): any {
        // console.log(session.email);
          return this.adminService.updateAdmin(name, id);
        }
      
        @Put('/updateadmin/:id')
        @UsePipes(new ValidationPipe())
        updateAdminbyid(
          @Body() mydto: AdminUpdateDto,
          @Param('id', ParseIntPipe) id: number,
        ): any {
          return this.adminService.updateAdminbyid(mydto, id);
        }
    
        @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteAdminbyid(id);
  }

  @Get('/findauthor')
  getAuthorByIDName(): any {
    return this.authorService.getAuthorByIDName();
  }

  @Get('/findauthor/:id')
  getAuthorByID(@Param('id', ParseIntPipe) id: number): any {
    return this.authorService.getAuthorByID(id);
  }

  @Post('/insertauthor')
  @UseInterceptors(FileInterceptor('filename',
  {storage:diskStorage({
    destination: './authors',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
}))
insertauthor(@Body() mydto:AuthorDto,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.authorService.insertAuthor(mydto);
// console.log(file)
}

    @Put('/updateauthor/')
    // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateAuthor(@Session() session,@Body('name') name: string, @Body('id') id: string): any {
      // console.log(session.email);
      return this.authorService.updateAuthor(name, id);
    }
  
    @Put('/updateauthor/:id')
    @UsePipes(new ValidationPipe())
    updateAuthorbyid(
      @Body() mydto: AdminUpdateDto,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.authorService.updateAuthorbyid(mydto, id);
    }

    @Delete('/deleteauthor/:id')
  deleteAuthorbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.authorService.deleteAuthorbyid(id);
  }

  @Get('/findeditor')
  getEditorByIDName(): any {
    return this.editorService.getEditorByIDName();
  }

  @Get('/findeditor/:id')
  getEditorByID(@Param('id', ParseIntPipe) id: number): any {
    return this.editorService.getEditorByID(id);
  }

    @Post('/inserteditor')
    @UseInterceptors(FileInterceptor('filename',
    {storage:diskStorage({
      destination: './editors',
      filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
      }
    })
  }))
  inserteditor(@Body() mydto:EditorDto,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filename = file.filename;  
  
  return this.editorService.insertEditor(mydto);
  // console.log(file)
  }

    @Put('/updateeditor/')
    // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateEditor(@Session() session,@Body('name') name: string, @Body('id') id: string): any {
      // console.log(session.email);
      return this.editorService.updateEditor(name, id);
    }
  
    @Put('/updateeditor/:id')
    @UsePipes(new ValidationPipe())
    updateEditorbyid(
      @Body() mydto: AdminUpdateDto,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.editorService.updateEditorbyid(mydto, id);
    }

    @Delete('/deleteeditor/:id')
  deleteEditorbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.editorService.deleteEditorbyid(id);
  }

  @Get('/finduser')
  getUserByIDName(): any {
    return this.userService.getUserByIDName();
  }

  @Get('/finduser/:id')
  getUserByID(@Param('id', ParseIntPipe) id: number): any {
    return this.userService.getUserByID(id);
  }

  @Post('/insertuser')
  @UseInterceptors(FileInterceptor('filename',
  {storage:diskStorage({
    destination: './users',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
}))
insertusers(@Body() mydto:UserDto,@UploadedFile(new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.userService.insertUser(mydto);
// console.log(file)
}

    @Put('/updateuser/')
    // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateUser(@Session() session,@Body('name') name: string, @Body('id') id: string): any {
      // console.log(session.email);
      return this.userService.updateUser(name, id);
    }
  
    @Put('/updateuser/:id')
    @UsePipes(new ValidationPipe())
    updateUserbyid(
      @Body() mydto: AdminUpdateDto,
      @Param('id', ParseIntPipe) id: number,
    ): any {
      return this.userService.updateUserbyid(mydto, id);
    }

    @Delete('/deleteuser/:id')
  deleteUserbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.userService.deleteUserbyid(id);
  }

    @Post('/signup')
@UseInterceptors(FileInterceptor('filename',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:AdminDto,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.filename;  

return this.adminService.signup(mydto);
// console.log(file)
}
@Post('/signin')
@UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:AdminDto)
{
  const res = await (this.adminService.signin(mydto));
if(res==true)
{
session.email = mydto.email;
return (session.email);
}
else
{
throw new UnauthorizedException({ message: "Invalid!!" });
}
 
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"Signed Out"};
  }
  else
  {
    throw new UnauthorizedException("invalid Actions");
  }
}

@Post('/sendemail')
async sendEmail
(
  @Body('to') to: string,
  @Body('subject') subject: string,
  @Body('text') text: string,
): Promise<void>
{
await this.adminService.sendEmail(to, subject, text);
}

}
