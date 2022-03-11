import { Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button type='button' (click)='event.emit(value)'>{{value}}</button>
  `,
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() value!: String;
  @Output() event = new EventEmitter();

}
