import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  public allMessages$ : BehaviorSubject<[]> = new BehaviorSubject([]);
  constructor() { }

  socket = io('http://192.168.1.39:3000/');

  public sendMessage(user,message) {
    let data = {user:user,message:message}
    this.socket.emit('message', data);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };


  public receiveAllMessages =()=>{
    this.socket.on('allMessages', (message) => {
      this.allMessages$.next(message);
    });
    return this.allMessages$.asObservable();
  }

}
