import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresetsPageComponent } from './presets-page/presets-page.component';
import { ManualPageComponent } from './manual-page/manual-page.component';

const routes: Routes = [
  { path: 'presets', component: PresetsPageComponent },
  { path: 'manual', component: ManualPageComponent },
  { path: '', redirectTo: '/presets', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }