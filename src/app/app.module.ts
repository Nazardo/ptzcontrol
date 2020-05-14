import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PresetListComponent } from './preset-list/preset-list.component';
import { SetPresetFormComponent } from './set-preset-form/set-preset-form.component';
import { MovePtzComponent } from './move-ptz/move-ptz.component';

@NgModule({
  declarations: [
    AppComponent,
    PresetListComponent,
    SetPresetFormComponent,
    MovePtzComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
