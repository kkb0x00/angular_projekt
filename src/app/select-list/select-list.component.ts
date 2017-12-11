import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OddzialyService } from '../oddzialy.service';
import { Oddzial } from '../oddzial';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {
  oddzialy: Oddzial[];
  selectedValue: string;
  @Output() emitValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(private oddzialyService: OddzialyService) { }

  ngOnInit() {
    this.oddzialy = this.oddzialyService.getOddzialy();
    this.selectedValue = this.oddzialy[0].symbol;
  }

  changedValue() {
    this.emitValue.emit(this.selectedValue);
  }

}
