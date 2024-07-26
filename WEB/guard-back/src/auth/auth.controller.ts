import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  UnauthorizedException
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';

import { AuthDTO } from './dto/authDto';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) { }

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { macID, password } = authDTO;
console.log(macID+password);
    const user = await this.userService.findByMacID(macID);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }
console.log(user);
    return user.username;
  }
}
