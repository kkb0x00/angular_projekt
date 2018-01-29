import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  template: `
<div class="flex-column content-width" *ngIf="wartosci.length > 0">
  <div class="flex-row szerokosc_multiselect">
    <label [for]=klucz>{{label}}</label>
    <a [ngClass] = "czyjestUstawiony? 'ustawiony': 'nieustawiony'"
       class="do_prawej" href="javascript:void(0)" title='Pokoloruj' (click)="koloruj()">
      <mat-icon svgIcon="pencil"></mat-icon>
    </a>
  </div>

  <div class="flex-row">
    <select multiple class="szerokosc_multiselect" [(ngModel)]=wybraneWartosci
            (ngModelChange)="wyslijWartosci($event)" [name]=klucz [id]=klucz >
        <option *ngFor="let wartosc of wartosci;" [value]=wartosc>{{wartosc}}</option>
    </select>
  </div>
</div>
`,
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  @Input() czyjestUstawiony: boolean;

  @Input() label: string;
  @Input() wartosci: string[];
  @Input() klucz: string;

  @Output() emitValues: EventEmitter<string[]> = new EventEmitter();
  @Output() emitujKolor: EventEmitter<string> = new EventEmitter();

  wybraneWartosci: string[];
  widoczny: boolean[];

  constructor() { }

  ngOnInit() {
    this.widoczny = Array(this.wartosci.length).fill(false);
  }

  wyslijWartosci() {
    this.emitValues.emit(this.wybraneWartosci);
  }

  koloruj() {
    this.emitujKolor.emit(this.klucz);
  }
}
