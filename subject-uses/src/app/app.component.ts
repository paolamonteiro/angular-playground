import { MessageService } from './service/message.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'subject-uses';
  public message: string;
  public subscriptions: Subscription[];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService
      .getMessage()
      .subscribe((message) => (this.message = message));
  }
}
