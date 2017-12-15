import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { LegendaComponent } from './legenda/legenda.component';
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

@NgModule({
  declarations: [
    MapaComponent,
    AppComponent,
    MainPanelComponent,
    LegendaComponent,
    MultiselectComponent,
    SelectListComponent,
    KeysPipe,
    MapaComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChj2cldufxZpvzGapwYOd_t9k_-qkcE_w'
    }),

  ],
  providers: [
    OddzialyService,
    PunktyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
