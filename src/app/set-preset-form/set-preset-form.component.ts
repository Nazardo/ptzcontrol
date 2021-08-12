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

  label: string | undefined
  number: number | undefined

  showErrorAlert = false
  showSuccessAlert = false

  set(): void {
    if (this.label === undefined || this.number === undefined) {
      return;
    }
    this.showErrorAlert = this.showSuccessAlert = false
    this.isapi.setPreset({
      label: this.label,
      number: this.number
    }).subscribe({
      next: _ => {
        this.presets.refreshPresets()
        this.showSuccessAlert = true
      },
      error: _ => this.showErrorAlert = true
    })
  }
}
