import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-legenda',
  templateUrl: './legenda.component.html',
  styleUrls: ['./legenda.component.css']
})
export class LegendaComponent {
  @Input() mapaKolorow;

  constructor() { }
}
