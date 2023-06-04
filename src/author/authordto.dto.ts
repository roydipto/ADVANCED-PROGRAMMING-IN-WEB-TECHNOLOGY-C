import { IsNotEmpty, IsInt, Length, IsEmail, IsString } from "class-validator";

export class AuthorDto { 

    @IsString()
   
    name: string;
    @IsString()
    contact : string;
    @IsEmail()

    email: string;
    @IsString()

    address: string;

    filename:string;
}