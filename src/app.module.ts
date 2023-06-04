import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/adminmodule.module';
import { AuthorModule } from './author/author.module';
import { EditorModule } from './editor/editor.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [AdminModule, AuthorModule,EditorModule, UserModule, TypeOrmModule.forRoot(
     { 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'NewsPortal',
      autoLoadEntities: true,
      synchronize: true,
    }
    ),],

  controllers: [],
  providers: [],
})
export class AppModule {}
