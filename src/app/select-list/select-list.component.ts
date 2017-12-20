import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OddzialyService } from '../oddzialy.service';
import { Oddzial } from '../oddzial';

@Component({
  selector: 'app-select-list',
  template: `
    <label for="oddzialy">Oddziały</label>

    <select [(ngModel)]="selectedValue" (ngModelChange)="changedValue($event)" name="oddzialy" id="oddzialy" >
      <option *ngFor="let oddzial of oddzialy" [value]=oddzial.symbol>{{oddzial.opis}}</option>
    </select>
  `,
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {
  oddzialy: Oddzial[];
  selectedValue: string;
  errorMessage: string;
  @Output() emitValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private oddzialyService: OddzialyService) { }

  ngOnInit() {
    this.oddzialyService.getOddzialy()
      .subscribe(oddzialy => {
        this.oddzialy = oddzialy;
        this.selectedValue = oddzialy[0].symbol;
      }, error => this.errorMessage = <any>error);
  }

  changedValue() {
    this.emitValue.emit(this.selectedValue);
  }

}
