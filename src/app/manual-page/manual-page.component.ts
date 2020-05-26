import { Component, OnInit } from '@angular/core';
import { IsapiImplementationService } from '../isapi-implementation.service';

@Component({
  selector: 'app-manual-page',
  templateUrl: './manual-page.component.html',
  styleUrls: ['./manual-page.component.scss']
})
export class ManualPageComponent implements OnInit {

  constructor(
    private isapi: IsapiImplementationService
  ) { }

  ngOnInit(): void {
  }

  panSpeed: number = 1
  tiltSpeed: number = 1
  zoomSpeed: number = 1

  move(pan: number, tilt: number, zoom: number) {
    pan *= this.panSpeed
    tilt *= this.tiltSpeed
    zoom *= this.zoomSpeed
    this.isapi.setContinuousMovement({
      pan: pan, tilt: tilt, zoom: zoom
    }).subscribe()
  }

  stop() {
    this.isapi.setContinuousMovement({
      pan: 0, tilt: 0, zoom: 0
    }).subscribe()
  }
}
