import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  template: `
    <div class="flex-column content-width" *ngIf="wartosci.length > 0">
      <label [for]=name>{{label}}</label>
      
      <div class="flex-row">
        <select multiple [(ngModel)]=selectedValues (ngModelChange)="fun($event)" [name]=name [id]=name >
            <option *ngFor="let wartosc of wartosci; let i = index" [value]=wartosc 
                    (mouseenter)="widoczny[i] = true" (mouseleave)="widoczny[i] = false">{{wartosc}}</option>
        </select>
        <div class="flex-column">
          <ng-container *ngFor="let wartosc of wartosci; let i = index;">
            <app-color-picker [style.visibility]="widoczny[i]? 'visible':'hidden'"></app-color-picker>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  @Input() label: string;
  @Input() wartosci: string[];
  @Input() name: string;

  @Output() emitValues: EventEmitter<string[]> = new EventEmitter();

  selectedValues: string[];
  widoczny: boolean[];

  constructor() { }

  ngOnInit() {
    this.widoczny = Array(this.wartosci.length).fill(false);
  }

  fun() {
    this.emitValues.emit(this.selectedValues);
  }
}
