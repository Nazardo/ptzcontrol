import { Component, OnInit } from '@angular/core';
import { IsapiImplementationService } from '../isapi-implementation.service';

@Component({
  selector: 'app-move-ptz',
  templateUrl: './move-ptz.component.html',
  styleUrls: ['./move-ptz.component.scss']
})
export class MovePtzComponent implements OnInit {

  constructor(
    private isapi: IsapiImplementationService
  ) { }

  ngOnInit(): void {
  }

  zoom(zoom: number, seconds: number) {
    this.isapi.doMovement({
      pan: 0, tilt: 0, zoom: 0
    }, 1000 * seconds).subscribe()
  }

  zoomCont(zoom: number) {
    this.isapi.setContinuousMovement({
      pan: 0, tilt: 0, zoom: zoom
    }).subscribe()
  }

  stop() {
    this.isapi.setContinuousMovement({
      pan: 0, tilt: 0, zoom: 0
    }).subscribe()
  }
}
