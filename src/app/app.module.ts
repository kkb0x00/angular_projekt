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
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    LegendaComponent,
    MultiselectComponent,
    SelectListComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [
    OddzialyService,
    PunktyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
