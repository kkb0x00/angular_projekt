import { Component, OnInit } from '@angular/core';
import { PunktyService } from '../punkty.service';
import { Punkt } from '../punkt';
import { OddzialyService } from '../oddzialy.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css']
})
export class MainPanelComponent implements OnInit {
  klucze: Partial<Punkt>;
  punkty: Punkt[];
  errorMessage: string;

  constructor(
    private punktyService: PunktyService,
    private oddzialyService: OddzialyService
  ) {}

  ngOnInit() {
    let pierwszyOddzial = this.oddzialyService.getOddzialy();
    this.pobierzPoOddziale(pierwszyOddzial);

    this.klucze = {
      trasa: "Trasa",
      klasa: "Klasyfikacja",
      ocena: "Ocena",
      rodzajkl: "Rodzaj klienta",
      handlowiec: "Handlowiec"
    }
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

}
