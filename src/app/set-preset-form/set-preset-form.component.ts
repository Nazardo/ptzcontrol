import { Component, OnInit } from '@angular/core';
import { IsapiImplementationService } from '../isapi-implementation.service';
import { Preset } from '../preset';
import { PresetsService } from '../presets.service';

@Component({
  selector: 'app-set-preset-form',
  templateUrl: './set-preset-form.component.html',
  styleUrls: ['./set-preset-form.component.scss']
})
export class SetPresetFormComponent implements OnInit {

  constructor(
    private isapi: IsapiImplementationService,
    private presets: PresetsService
  ) { }

  ngOnInit(): void {
  }

  label: string
  number: number

  set(): void {
    this.isapi.setPreset({
      label: this.label,
      number: this.number
    }).subscribe(
      () => this.presets.refreshPresets(),
      error => console.error(error)
    )
  }
}
