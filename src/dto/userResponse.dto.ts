import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRoles } from 'src/common/enums';

export class UserResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  @Exclude()
  password?: string;
}