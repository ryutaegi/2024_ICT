import {
  Body,
  ConflictException,
  Controller, Post,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthDTO } from 'src/auth/dto/authDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/signup')
  async signup(@Body() authDTO: AuthDTO.SignUp) {

    const { macID, username } = authDTO;

    const hasMacID = await this.userService.findByMacID(macID);
    if (hasMacID) {
      throw new ConflictException('이미 사용중인  입니다.');
    }

    const hasUsername = await this.userService.findByUsername(username);
    if (hasUsername) {
      throw new ConflictException('이미 사용중인 닉네임 입니다.');
    }

    const userEntity = await this.userService.create(authDTO);

    return '회원가입성공';
  }
}
