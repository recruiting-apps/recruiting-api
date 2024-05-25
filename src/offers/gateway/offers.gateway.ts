import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { OfferGatewayMessage } from './types'

@WebSocketGateway(4001, {
  cors: {
    origin: '*'
  }
})
export class OffersGateway {
  @WebSocketServer()
    server: Server

  @SubscribeMessage(OfferGatewayMessage.NEW_APPLICATION)
  handleNewApplication (
    @MessageBody() payload: any
  ): void {
    this.server.emit(OfferGatewayMessage.NEW_APPLICATION, payload)
  }
}
