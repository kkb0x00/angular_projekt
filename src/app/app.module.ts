import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { SelectListComponent } from './select-list/select-list.component';
import { OddzialyService } from './oddzialy.service';
import { PunktyService } from './punkty.service';
import { KeysPipe } from './keys.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapaComponent } from './mapa/mapa.component';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { LegendaComponent } from './legenda/legenda.component';

@NgModule({
  declarations: [
    MapaComponent,
    AppComponent,
    MainPanelComponent,
    MultiselectComponent,
    SelectListComponent,
    KeysPipe,
    MapaComponent,
    LegendaComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChj2cldufxZpvzGapwYOd_t9k_-qkcE_w'
    }),
    MatIconModule,
  ],
  providers: [
    OddzialyService,
    PunktyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
