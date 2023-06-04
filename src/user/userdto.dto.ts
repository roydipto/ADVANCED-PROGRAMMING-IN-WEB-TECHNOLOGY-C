import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class UserDto {   
   

    @IsNotEmpty()
    name: string;
   
    @Length(3,8)
    contact : string;

    @IsEmail()
    email: string;

    address: string;
    
    filename: string;

}