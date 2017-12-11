import { Injectable } from '@angular/core';
import { Oddzial } from './oddzial';
import { ODDZIALY} from './mock-oddzialy';


@Injectable()
export class OddzialyService {
  private _adres = 'https://motlawa.cdg.net.pl/analizy/kontrgeo_data.php?mode=oddzialy';

  constructor() { }

  getOddzialy(): Oddzial[] {
    return ODDZIALY;
  }

}
