import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches, IsNumber } from "class-validator";

export class AdminDto {   
   

    // @IsNotEmpty()
    // @MinLength(2, {
    //     message: 'Name is too Short',
    //   })
    //   @MaxLength(10, {
    //     message: 'Title is too Long',
    //   })
       name: string;
   
    // @IsNotEmpty()
    // @IsNumber()
    contact : string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsString()
    @MinLength(2)
    @MaxLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Week Password'})
    password: string;

    // @IsNotEmpty()
    // @IsString()
    address: string;
    
    filename:string;

}