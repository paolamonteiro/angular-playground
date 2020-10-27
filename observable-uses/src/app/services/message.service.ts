import { seriesMock } from './../../assets/series-mock';
import { Subject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message = new Subject<string>();

  public setMessage(content: string): void {
    this.message.next(content);
  }

  public getMessage(): Observable<string> {
    return this.message;
  }

  public getSeries(): Observable<any[]> {
    return of(seriesMock)
  }
}
