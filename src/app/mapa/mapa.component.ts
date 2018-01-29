import {
  Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter, SimpleChange
} from '@angular/core';
import { Punkt } from '../punkt';
import { HttpClient } from '@angular/common/http';

const distinctColors = require('distinct-colors');

@Component({
  selector: 'app-mapa',
  template: `
  <agm-map class="wymiary polozenie" [latitude]="centrumMapyLat" [longitude]="centrumMapyLon" [zoom]="8">
    <agm-marker *ngFor="let punkt of punktyPofiltrowane;"
                [latitude]="convertToNumber(punkt.lat)"
                [longitude]="convertToNumber(punkt.lon)"
                [openInfoWindow]="true"
                [iconUrl]="markery[punkt[filtracjaKoloru]] || markerWzorcowy">
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
export class MapaComponent implements OnChanges, OnInit {
  private _filtracjaKoloru: string;

  @Input() filtracjaKoloru;
  @Input() punktyPofiltrowane: Punkt[];
  @Input() centrumMapyLat;
  @Input() centrumMapyLon;
  @Input() elementyFiltracji;

  @Output() emitujMapeKolorow: EventEmitter<any> = new EventEmitter<any>();

  private rozmiarMarkerow = {
    height: 40,
    width: 30
  };

  public slownikKolorow;

  markerWzorcowy = {
    url: 'assets/marker.svg',
    scaledSize: this.rozmiarMarkerow
  };

  contentMarkera;
  markery;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.markerWzorcowy.url, { responseType: 'text' }).subscribe(data => {
      this.contentMarkera = data;
    });

    this.slownikKolorow = {};
    this.markery = {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.zmianaKolorow(changes.filtracjaKoloru);
  }

  convertToNumber(coord: string) {
    return Number(coord);
  }

  przypiszPalete() {
    if (!this.filtracjaKoloru) {
      return;
    }

    const rozneKolory = distinctColors({ count: this.elementyFiltracji.length });
    this.slownikKolorow = {};

    rozneKolory.forEach((el, i) => {
      this.slownikKolorow[this.elementyFiltracji[i]] = el;
    });

    this.wyslijWartosci();
  }

  zmianaKolorow(zmianaKoloru: SimpleChange) {
    if (!zmianaKoloru) {
      return;
    }

    this._filtracjaKoloru = this.filtracjaKoloru;
    this.przypiszPalete();
    this.przypiszMarkery();

  }

  przypiszMarkery() {
    for (const key in this.slownikKolorow) {
      const color = this.RGBToHex(this.slownikKolorow[key]);
      this.markery[key] = this.przygotujMarker(color);
    }
  }


  RGBToHex(rgbColor) {
    const color = rgbColor._rgb;

    let bin = color[0] << 16 | color[1] << 8 | color[2];
    return (function(h){
      return new Array(7 - h.length).join('0') + h;
    })(bin.toString(16).toUpperCase());
  }

  przygotujMarker(nowyKolor) {
    const idKolor = 'kolor';

    const contentDOM = new DOMParser().parseFromString(this.contentMarkera, 'text/html');
    contentDOM.getElementById(idKolor).setAttribute('fill', '#' + nowyKolor);

    const contentString = new XMLSerializer().serializeToString(contentDOM.getElementById('contentMarkera'));
    const encoded = window.btoa(contentString);

    return {
      url: 'data:image/svg+xml;base64,' + encoded,
      scaledSize: this.rozmiarMarkerow
    };
  }

  wyslijWartosci() {
    this.emitujMapeKolorow.emit(this.slownikKolorow);
  }
}

