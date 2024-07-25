import {
  Body,
  ConflictException,
  Controller, Post, Patch
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

  @Patch('/updatePW')
  async updatePW(@Body() authDTO: AuthDTO.updatePW) {
	const { macID, nowPW, newPW } = authDTO;
console.log(macID);
console.log(newPW);
        const user = await this.userService.findByMacID(macID);	
	if(!user)
	throw new ConflictException('empty user');

	const isSamePassword = await bcrypt.compareSync(nowPW, user.password);
	if(!isSamePassword)
	throw new ConflictException('password error');

return await this.userService.updatePW(macID, newPW);
  }


  @Patch('/updateUsername')
  async updateUsername(@Body() authDTO: AuthDTO.updateUsername) {
	const { macID, newUsername } = authDTO;
console.log(macID);
console.log(newUsername);
        const user = await this.userService.findByMacID(macID);	
	if(!user)
	throw new ConflictException('empty user');


return await this.userService.updateUsername(macID, newUsername);
  }


}
