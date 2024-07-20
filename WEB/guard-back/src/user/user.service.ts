import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthDTO } from 'src/auth/dto/authDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(authDTO: AuthDTO.SignUp) {
    const userEntity = await this.userRepository.create(authDTO);
    return await this.userRepository.save(userEntity);
  }

   async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByMacID(macID: string) {
    return await this.userRepository.findOne({
      where: {
        macID,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async updatePW(macID: string, newPW: string) {
    const user = await this.findByMacID(macID);
    
    const hashedPassword = await bcrypt.hash(newPW, 10);
    user.password = hashedPassword;
    
    await this.userRepository.save(user);
    return { message: 'Password updated successfully' };
}

}
