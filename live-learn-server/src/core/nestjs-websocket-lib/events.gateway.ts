
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  clientServerMap: { [key: string]: Socket } = {}

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket): Observable<WsResponse<number>> {
    console.log(data)
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(data)
    return data;
  }

  @SubscribeMessage('initClientServer')
  async initClientServer(@MessageBody() opt: { clientName }, @ConnectedSocket() client: Socket): Promise<{ [key: string]: Socket }> {
    this.clientServerMap[opt.clientName] = client
    return opt.clientName
  }
}
