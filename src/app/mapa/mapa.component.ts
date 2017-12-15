import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Punkt } from '../punkt';


@Component({
  selector: 'app-mapa',
  template: `
    <agm-map class="wymiary polozenie" [latitude]="centrumMapyLat" [longitude]="centrumMapyLon" [zoom]="8">
      <agm-marker *ngFor="let punkt of punktyPofiltrowane;" 
                  [latitude]="convertToNumber(punkt.lat)" 
                  [longitude]="convertToNumber(punkt.lon)">
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
    console.log(this.centrumMapyLat);
    console.log(this.centrumMapyLon);
  }

  convertToNumber(coord: string) {
    return Number(coord);
  }

  constructor() {}

}

