import { Injectable } from '@angular/core';
import { Oddzial } from './oddzial';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OddzialyService {
  private api = 'https://motlawa.cdg.net.pl/analizy/kontrgeo_data.php?mode=oddzialy';

  constructor(private _http: HttpClient) { }

  getOddzialy(): Observable<Oddzial[]> {
    return this._http.get<Oddzial[]>(this.api)
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }
}
