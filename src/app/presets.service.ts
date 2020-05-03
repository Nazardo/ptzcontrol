import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Preset } from './preset';
import { IsapiImplementationService } from './isapi-implementation.service';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {

  presetsUrl = 'assets/presets.json'

  constructor(
    private isapi: IsapiImplementationService
  ) {
    this.presets = new Subject<Preset[]>()
  }

  readonly presets: Subject<Preset[]>

  refreshPresets(): void {
    this.isapi.getPresets()
      .subscribe(
        presets => this.presets.next(presets),
        error => console.error(error)
      )
  }
}
