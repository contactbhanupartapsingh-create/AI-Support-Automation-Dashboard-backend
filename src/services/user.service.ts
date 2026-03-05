import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { User } from 'src/entity/user.entity';
import { UserRoles } from 'src/static';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
constructor( 
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  
  
  // ******************************internal function used by other services*************************
  async getOneUser(email: string): Promise<string | User> {
  return this.usersRepository.findOne({ where: { email } }).then(user => {
    if (user) {
      return user;
    } else {
      return 'User not found';
    }
  })}

  // **********************external function used by user controller*************************
  async getUser(email: string): Promise<string | UserResponseDto> {
    return this.usersRepository.findOne({ where: { email } }).then(user => {
      if (user) {
        return user;
      } else {
        return 'User not found';
      }
    })}


    async getAllUsers(): Promise<UserResponseDto[]> {
        return this.usersRepository.find();
    }

    async createUser(userCreateDto: UserCreateDto): Promise<string | UserResponseDto> {
        const existingUser = await this.usersRepository.findOne({ where: { email: userCreateDto.email } });
        if (existingUser) {
          return 'User already exists';
        }
        const newUser = this.usersRepository.create({...userCreateDto, role: UserRoles.USER});
        return this.usersRepository.save(newUser);
    }
}
