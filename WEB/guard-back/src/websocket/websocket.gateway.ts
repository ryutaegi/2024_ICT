import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {UserService} from 'src/user/user.service';

@WebSocketGateway(5024, { cors: { origin: '*' } })
export class websocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private rooms: Map<string, string[]> = new Map(); // 맥 주소를 키로 하는 룸 목록

  constructor(private readonly userService: UserService ) {}
async isMACid(macID: string): Promise<boolean> {
  const user = await this.userService.findByMacID(macID);
  if (!user) {
    console.log("MACID no");
    return false;
  } else {
    console.log("MACID yes");
    return true;
  }
}


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

  	this.isMACid(macAddress);

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
    console.log(data.datas);
    this.server.to(data.room).emit('message', data.datas);
    return 'websocket connected';
  }
}

