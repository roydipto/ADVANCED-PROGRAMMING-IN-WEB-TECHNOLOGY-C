import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class EditorDto {   
   
    name: string;
   
    contact : string;

    email: string;

    address: string;

  filename: string;
  
}