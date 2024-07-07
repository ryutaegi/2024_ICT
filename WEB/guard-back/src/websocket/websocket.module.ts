import { Module } from '@nestjs/common';
import { websocketGateway } from './websocket.gateway';
import {UserModule} from '../user/user.module';

@Module({
  imports : [UserModule],
  providers: [websocketGateway],
})
export class websocketModule {}

