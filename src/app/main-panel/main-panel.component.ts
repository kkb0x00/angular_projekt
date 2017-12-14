import { Component, OnInit } from '@angular/core';
import { PunktyService } from '../punkty.service';
import { Punkt } from '../punkt';
import { OddzialyService } from '../oddzialy.service';
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
  errorMessage: string;

  constructor(
    private punktyService: PunktyService,
    private oddzialyService: OddzialyService) {
  }

  ngOnInit() {
    let pierwszyOddzial = this.oddzialyService.getOddzialy();
    this.pobierzPoOddziale(pierwszyOddzial);
    this.klucze = {
      trasa: 'Trasa',
      klasa: 'Klasyfikacja',
      ocena: 'Ocena',
      rodzajkl: 'Rodzaj klienta',
      handlowiec: 'Handlowiec'
    };

    this.filtry = this.ustawFiltry();
  }

  private ustawFiltry() {
    let filtry = {};

    let keys = _.keys(this.klucze);
    _.each(keys, (key) => {
      filtry[key] = [];
    });

    return filtry
  }

  poKluczu(klucz) {
    return this.punkty
      .map(wartosc => wartosc[klucz])
      .filter((x, i, a) => x && a.indexOf(x) === i)
      .sort();
  }

  pobierzPoOddziale(oddzial) {
    this.punktyService.getPunkty(oddzial)
      .subscribe(punkty => {
        this.punkty = punkty;
      }, error => this.errorMessage = <any>error);
  }

  filtruj(klucz, wartosci) {
    this.filtry[klucz] = wartosci;

    let punktyPofiltrowane = this.punkty.filter(punkt =>
      Object.keys(this.filtry).every(key =>
        this.filtry[key].includes(punkt[key]) || this.filtry[key].length == 0
      )
    );

    console.log(punktyPofiltrowane);
  }

}
