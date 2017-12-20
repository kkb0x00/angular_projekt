import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Punkt } from '../punkt';


@Component({
  selector: 'app-mapa',
  template: `
    <agm-map class="wymiary polozenie" [latitude]="centrumMapyLat" [longitude]="centrumMapyLon" [zoom]="8">
      <agm-marker *ngFor="let punkt of punktyPofiltrowane;" 
                  [latitude]="convertToNumber(punkt.lat)" 
                  [longitude]="convertToNumber(punkt.lon)"
                  [openInfoWindow]="true">
        <agm-info-window>
          <p>Handlowiec: {{punkt.handlowiec}}</p>
          <p>Klasa: {{punkt.klasa}}</p>
          <p>Rodzaj klienta: {{punkt.rodzajkl}}</p>
          <p>Ocena: {{punkt.ocena}}</p>
          <p>Trasa: {{punkt.trasa}}</p>
        </agm-info-window>
      </agm-marker>
    </agm-map>
  `,
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnChanges {
  @Input() punktyPofiltrowane: Punkt[];
  @Input() centrumMapyLat;
  @Input() centrumMapyLon;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.punktyPofiltrowane);
  }

  convertToNumber(coord: string) {
    return Number(coord);
  }

  constructor() {}

  toggleLabel(punkt: Punkt) {
    console.log(punkt)
  }

}

