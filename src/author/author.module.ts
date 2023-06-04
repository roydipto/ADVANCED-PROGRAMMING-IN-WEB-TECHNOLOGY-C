import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorEntity } from "./authorentity.entity";



@Module({
imports: [TypeOrmModule.forFeature([AuthorEntity])],
controllers: [],
providers: [],

})

export class AuthorModule {}