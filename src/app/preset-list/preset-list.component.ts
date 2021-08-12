import { Component, OnInit } from '@angular/core';
import { Preset } from '../preset';
import { PresetsService } from '../presets.service';
import { IsapiImplementationService } from '../isapi-implementation.service';
import { PresetViewModel } from '../preset-view-model';
import { map, take } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset-list.component.html',
  styleUrls: ['./preset-list.component.scss']
})
export class PresetListComponent implements OnInit {

  constructor(
    private presetsService: PresetsService,
    private isapi: IsapiImplementationService
  ) {
    this.presets = []
  }

  ngOnInit(): void {
    this.presetsService.cachedPresets()
      .pipe(
        map(presets => presets.map(p => <PresetViewModel>{
          id: p.number,
          label: p.label,
          error: false,
          success: false
        }))
      ).subscribe(presets => this.presets = presets)
  }

  presets: PresetViewModel[]

  presetClick(preset: PresetViewModel): void {
    // Clear previous state
    this.presets.forEach(p => {
      p.success = false,
      p.error = false
    })
    // Call API to go to new preset
    this.isapi.presetGoto(preset.id)
      .subscribe(
        _ => preset.success = true,
        _ => preset.error = true
      )
  }

  refreshClick(): void {
    this.presetsService.refreshPresets()
  }

}
