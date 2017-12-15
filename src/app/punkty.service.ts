import { Injectable } from '@angular/core';
import { Punkt } from './punkt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class PunktyService {
  private api = 'https://motlawa.cdg.net.pl/analizy/kontrgeo_data.php?mode=geodata&oddzial=';

  constructor(private _http: HttpClient) { }

  getPunkty(oddzial): Observable<Punkt[]> {
    return this._http.get<Punkt[]>(this.api + oddzial)
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }

}
