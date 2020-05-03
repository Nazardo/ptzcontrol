import { Component, OnInit } from '@angular/core';
import { Preset } from '../preset';
import { PresetsService } from '../presets.service';
import { IsapiImplementationService } from '../isapi-implementation.service';

@Component({
  selector: 'app-preset-list',
  templateUrl: './preset-list.component.html',
  styleUrls: ['./preset-list.component.scss']
})
export class PresetListComponent implements OnInit {

  constructor(
    private presetsService: PresetsService,
    private isapi: IsapiImplementationService
  ) { }

  ngOnInit(): void {
    this.presetsService.presets
      .subscribe(presets => this.presets = presets)
  }

  presets: Preset[]

  presetClick(preset: Preset): void {
    this.isapi.presetGoto(preset.number).subscribe()
  }

}
