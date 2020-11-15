import { Subscription, Observable, from, of, merge, partition } from 'rxjs';
import { concatAll, concatMap, count, filter, first, flatMap, last, map, window, mergeMap, pluck, reduce, take, tap } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from "./services/message.service";
import { seriesMockToReduce } from "src/assets/series-mock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public subscriptions = new Subscription();
  public form: FormGroup;
  public message: string;
  
  constructor(private formbuilder: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      message: [''],
    })

    this.subscriptions.add(
      this.messageService.getMessage().subscribe(content => {
        if(content) {
          this.message = content
        }
      })
    )

    // Transforming data with map function
    this.subscriptions.add(
      this.messageService.getSeries().pipe(
        flatMap(series => series),
        map((series: any[]) => series.map(serie => serie.actors)),
        map((actors: string[]) => actors.join(',')), // transforms actors array in a string of actors
        map((actors: string) => actors.split(',')), // turns back the string of actors to an array of actors
        map((actors: string[]) => actors.length), // transforms data array in a simple number
      ).subscribe(length => console.log(length)) // 16
    )

    // Getting data with filter function
    this.subscriptions.add(
      this.messageService.getSeries().pipe(
        flatMap(series => series),
        take(2),
        filter(serie => serie.actors.includes('Terry Crews'))
      ).subscribe(value => console.log('filter and take ', value))
    )

    // Getting data with reduce function
    from(seriesMockToReduce).pipe(
      reduce((acc, curr) => acc.concat(curr), []),
      flatMap(series => series),
      first()
    ).subscribe(value => console.log('reduce and first ', value))

    // Getting data with pluck function
    this.subscriptions.add(
      this.messageService.getSeries().pipe(
        flatMap(series => series),
        last(),
        pluck('actors'),
      ).subscribe(actors => console.log('pluck ', actors))
    )

    // Ways to flattening higher-order streams:

    // Getting data with map + concatAll functions
    this.getAllSeries().pipe(
      map(value => value),
      tap(console.log),
      concatAll(),
    ).subscribe(values => console.log('map + concatAll ', values))

    // Getting data with concatMap function
    this.getAllSeries().pipe(
      concatMap(value => value),
    ).subscribe(values => console.log('concatMap ', values)) // same result of previous function

    // Getting data with mergeMap function
    this.getAllSeries().pipe(
      mergeMap(value => value),
    ).subscribe(values => console.log('mergeMap ', values)) // same result of previous function

    // Getting data with count function
    this.subscriptions.add(
      this.messageService.getSeries().pipe(
      count(),
    ).subscribe(values => console.log('count ', values))) // 1
  }

  public setMessage(): void {
    this.messageService.setMessage(this.form.get('message').value);
  }

  // High Order Obsevables:
  public getAllSeries = () => {
    // return of(this.messageService.getSeries());
    return of([of(this.messageService.getSeries()), of(this.messageService.getSeries())])
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
