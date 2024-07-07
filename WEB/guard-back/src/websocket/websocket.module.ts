import { Module } from '@nestjs/common';
import { websocketGateway } from './websocket.gateway';

@Module({
  providers: [websocketGateway],
})
export class websocketModule {}

