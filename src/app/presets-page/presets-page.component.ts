import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-presets-page',
    templateUrl: './presets-page.component.html',
    styleUrls: ['./presets-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PresetsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
