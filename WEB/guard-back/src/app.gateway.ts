import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5024, { cors: { origin: '*' } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private rooms: Map<string, string[]> = new Map(); // 맥 주소를 키로 하는 룸 목록

  afterInit(server: Server) {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.rooms.forEach((clients, macAddress) => {
      const index = clients.indexOf(client.id);
      if (index !== -1) {
        clients.splice(index, 1);
        if (clients.length === 0) {
          this.rooms.delete(macAddress);
        }
      }
    });
  }

  @SubscribeMessage('joinOrCreateRoom')
  handleJoinOrCreateRoom(client: Socket, data:[ string, number] ): void {
    const [macAddress, isMobile] = data;
	  console.log(macAddress, isMobile);
    if (!this.rooms.has(macAddress)) {
      this.rooms.set(macAddress, []);
      console.log(`Room created: ${macAddress}`);
    }
    client.join(macAddress);
    this.rooms.get(macAddress).push(client.id);
    client.emit('roomJoined', macAddress);
    console.log(`Client ${client.id} joined room: ${macAddress}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: {room : string, datas : any}) {
    console.log(data);
    this.server.to(data.room).emit('message', data);
    return 'websocket connected';
  }
}

