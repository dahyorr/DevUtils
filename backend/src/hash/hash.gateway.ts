// import { ConfigService } from '@nestjs/config';
import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { HashType } from 'src/types';
import { HashService } from './hash.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'file-hash',
})
export class HashGateway {
  constructor(private readonly service: HashService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hash-ready')
  handleMessage(
    @MessageBody() data: { fileId: string; hashType: HashType },
    @ConnectedSocket() client: Socket,
  ): string {
    const { fileId, hashType } = data

    const interval = setInterval(async () => {
      const res = await this.service.getHashResult(fileId) //TODO: listen for redis publish instead
      const hashData = res.find((hash) => hashType === hash.type)

      if (hashData.status === "completed") {
        clearInterval(interval)
        client.emit('hash-completed', hashData)
      }
      return;
    }, 1000);

    console.log(data.fileId, data.hashType)
    return 'Hello world!';
  }
}
