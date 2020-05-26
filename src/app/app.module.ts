import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PresetListComponent } from './preset-list/preset-list.component';
import { SetPresetFormComponent } from './set-preset-form/set-preset-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PresetsPageComponent } from './presets-page/presets-page.component';
import { ManualPageComponent } from './manual-page/manual-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PresetListComponent,
    SetPresetFormComponent,
    LoginPageComponent,
    PresetsPageComponent,
    ManualPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
