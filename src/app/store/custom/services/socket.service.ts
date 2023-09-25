import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    public socket: Socket
  ) { }

  emit(payload: any, room: string) {
    this.socket.emit('socket_emit', {
      payload,
      room
    });
  }
}
