import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  template: `
    <div class="top-label content-width" *ngIf="wartosci.length > 0">
      <label [for]=name>{{label}}</label>
      
      <select multiple [(ngModel)]=selectedValues (ngModelChange)="fun($event)" [name]=name [id]=name >
        <option *ngFor="let wartosc of wartosci" [value]=wartosc>{{wartosc}}</option>
      </select>
    </div>
  `,
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  selectedValues: string[];
  @Output() emitValues: EventEmitter<string[]> = new EventEmitter();

  @Input() label: string;
  @Input() wartosci: string[];
  @Input() name: string;
  constructor() { }

  ngOnInit() {}

  fun() {
    this.emitValues.emit(this.selectedValues);
  }

}
