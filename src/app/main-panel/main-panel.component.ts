import { Component, Input, OnInit } from '@angular/core';
import { PunktyService } from '../punkty.service';
import { Punkt } from '../punkt';
import _ from 'lodash';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  klucze: Partial<Punkt>;
  filtry: Partial<Punkt>;

  punkty: Punkt[];
  punktyPofiltrowane: Punkt[];

  filtracjaKoloru: string;
  elementyFiltracji;
  mapaKolorow;

  errorMessage: string;

  limitPrzekroczony: boolean;
  centrumMapy: object;

  constructor(private punktyService: PunktyService) {}

  ngOnInit() {
    this.klucze = {
      trasa: 'Trasa',
      klasa: 'Klasyfikacja',
      ocena: 'Ocena',
      rodzajkl: 'Rodzaj klienta',
      handlowiec: 'Handlowiec'
    };
    this.mapaKolorow = [];

    this.centrumMapy = {
      lat: 53,
      lon: 21
    };

    this.filtry = this.ustawFiltry();
  }

  private ustawFiltry() {
    const filtry = {};

    const keys = _.keys(this.klucze);
    _.each(keys, (key) => {
      filtry[key] = [];
    });

    return filtry;
  }

  poKluczu(klucz) {
    if (!klucz) {
      return;
    }

    return this.punkty
      .map(wartosc => wartosc[klucz])
      .filter((x, i, a) => x && a.indexOf(x) === i)
      .sort();
  }

  pobierzPoOddziale(oddzial) {
    this.punktyService.getPunkty(oddzial)
      .subscribe(punkty => {
        this.punkty = punkty;
        this.punktyPofiltrowane = this.zwrocLimit(this.punkty);
        this.ustawCentrum(this.punktyPofiltrowane);
      }, error => this.errorMessage = <any>error);
  }

  filtruj(klucz, wartosci) {
    this.filtry[klucz] = wartosci;

    this.punktyPofiltrowane = this.punkty.filter(punkt =>
      Object.keys(this.filtry).every(key =>
        this.filtry[key].includes(punkt[key]) || this.filtry[key].length === 0
      )
    );

    this.punktyPofiltrowane = this.zwrocLimit(this.punktyPofiltrowane);
    this.ustawCentrum(this.punktyPofiltrowane);
  }

  zwrocLimit(punkty: Punkt[]) {
    if (punkty.length > 400) {
      this.limitPrzekroczony = true;
      return punkty.slice(0, 400);
    }

    this.limitPrzekroczony = false;
    return punkty;
  }

  ustawCentrum(punkty: Punkt[]) {
    if (!punkty.length) {
      return;
    }

    let lat: any = punkty
      .map(punkt => Number(punkt.lat))
      .reduce((a, b) => a + b) / punkty.length;

    let lon: any = punkty
      .map(punkt => Number(punkt.lon))
      .reduce((a, b) => a + b) / punkty.length;

    this.centrumMapy = {
      lat: lat,
      lon: lon
    };
  }

  ustawFiltracje(nowaFiltracja: string) {
    if (nowaFiltracja === this.filtracjaKoloru) {
      this.filtracjaKoloru = null;
      return;
    }

    this.filtracjaKoloru = nowaFiltracja;
    this.mapaKolorow.length = 0;
  }

  ustawSlownik(wartosci) {
    for (const elementSlownika in wartosci) {
      if(this.punktyPofiltrowane.some((punkt) => Object.values(punkt).indexOf(elementSlownika) > -1 )) {
        this.mapaKolorow.push([elementSlownika, wartosci[elementSlownika]]);
      }
    }
  }

}
