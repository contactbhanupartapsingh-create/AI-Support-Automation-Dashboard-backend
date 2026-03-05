import { IsString, IsEmail, IsNotEmpty} from "class-validator";

export class UserCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}