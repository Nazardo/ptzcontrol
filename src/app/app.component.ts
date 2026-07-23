import { Component } from '@angular/core';
import { PresetsService } from './presets.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [],
    standalone: false
})
export class AppComponent {

  constructor(
    private presetsService: PresetsService
  ) { }

  navbarCollapsed = true

  ngOnInit(): void {
    this.presetsService.refreshPresets()
  }
}
