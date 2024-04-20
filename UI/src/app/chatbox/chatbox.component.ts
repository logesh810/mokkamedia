import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  newMessage: string;
  messageList = [];

  constructor(private chatService: ChatService, private ls: StorageService, private router: Router) {

  }

  ngOnInit() {

    // Get initial messages
    this.chatService.receiveAllMessages().subscribe((messages) => {
      this.messageList = messages;
    });

    this.chatService.getNewMessage().subscribe((message: string) => {
      console.log(message);

      this.messageList.push(message);
    })
  }

  sendMessage() {
    let currentUser = this.ls.get("userData");
    if (!currentUser) { this.router.navigateByUrl("/login") }
    this.chatService.sendMessage(currentUser, this.newMessage);
    this.newMessage = '';
  }

  logout() {
    this.ls.removeAll();
    this.router.navigateByUrl("/login");
  }
}
