import { Component } from '@angular/core';

interface IPerson {
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public actualValue: string;
  public valueToSave: string;
  public isMouseOver: boolean = false;
  public name: string;

  public person: IPerson;

  alert(): any {
    alert('Clicked!');
  }

  onKeyUp(event: KeyboardEvent): any {
    this.actualValue = (<HTMLInputElement>event.target).value;
  }

  saveValue(value: string): any {
    this.valueToSave = value;
  }

  onMouseOverOut(): boolean {
    return (this.isMouseOver = !this.isMouseOver);
  }
}
