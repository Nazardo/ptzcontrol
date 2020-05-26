import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preset } from './preset';
import { IsapiImplementationService } from './isapi-implementation.service';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {

  presetsUrl = 'assets/presets.json'
  private readonly presets: BehaviorSubject<Preset[]>

  constructor(
    private isapi: IsapiImplementationService
  ) {
    this.presets = new BehaviorSubject<Preset[]>([])
  }

  cachedPresets(): Observable<Preset[]> {
    return this.presets
  }

  refreshPresets(): void {
    this.isapi.getPresets()
      .subscribe(
        presets => this.presets.next(presets),
        error => {
          let p = []
          for (let i = 0; i < 20; ++i) {
            p.push({
              number: i,
              label: 'Asd qwerty poiuyt lk'
            })
          }
          this.presets.next(p)
          console.log(p)
        }
      )
  }
}
