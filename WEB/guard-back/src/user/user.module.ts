import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], //userrepository사용할수있도록 주입
  exports: [UserService], //userService 다른곳에서 사용할수 있도록 exports
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
