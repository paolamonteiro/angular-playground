import { Component, OnInit } from '@angular/core';

import { MessageService } from './../../service/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  setMessage(event: any): any {
    this.messageService.setMessage(event.value);
  }
}
