import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Preset } from './preset';
import { PtzValues } from './ptz-values';

@Injectable({
  providedIn: 'root'
})
export class IsapiImplementationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  baseUrl: string = '/ISAPI/PTZCtrl/channels/1'

  setContinuousMovement(ptz: PtzValues): Observable<void> {
    const url = [this.baseUrl, 'continuous'].join('/')
    const xmlData = [
      '<PTZData version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">',
      '<pan>', ptz.pan, '</pan><tilt>', ptz.tilt, '</tilt><zoom>',
      ptz.zoom,'</zoom></PTZData>'
    ].join('')
    return this.doXmlPut(url, xmlData)
  }

  doMovement(ptz: PtzValues, millis: number): Observable<void> {
    const url = [this.baseUrl, 'momentary'].join('/')
    const xmlData = [
      '<PTZData version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">',
      '<pan>', ptz.pan, '</pan><tilt>', ptz.tilt, '</tilt><zoom>',
      ptz.zoom,'</zoom><Momentary><duration>', millis,
      '</duration></Momentary></PTZData>'
    ].join('')
    return this.doXmlPut(url, xmlData)
  }

  getPresets(): Observable<Preset[]> {
    const url = [this.baseUrl, 'presets'].join('/')
    return this.httpClient.get(url, {
      responseType: 'text',
      headers: new HttpHeaders({
        'Accept': 'application/xml'
      })
    }).pipe(
      catchError(this.handleHttpError),
      map(this.parseXmlPresetList)
    )
  }

  private parseXmlPresetList(xml: string): Preset[] {
    const parser = new DOMParser()
    const document = parser.parseFromString(xml, 'application/xml')
    const presetElements = document.querySelectorAll('PTZPreset')
    let returnedList: Preset[] = []
    for (let i = 0; i < presetElements.length; ++i) {
      const presetElement = presetElements[i];
      let id = parseInt(presetElement.querySelector('id')?.innerHTML || '0')
      let label = presetElement.querySelector('presetName')?.innerHTML
      if (!isNaN(id) && id > 0 && id <= 20 && label !== undefined) {
        returnedList.push({
          number: id,
          label: label
        })
      }
    }
    return returnedList
  }

  presetGoto(presetNumber: number): Observable<void> {
    const url = [this.baseUrl, 'presets', presetNumber, 'goto'].join('/')
    return this.doEmptyPut(url)
  }

  setPreset(preset: Preset): Observable<void> {
    const url = [this.baseUrl, 'presets', preset.number].join('/')
    const xmlData = [
      '<PTZPreset version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">',
      '<enabled>true</enabled><id>', preset.number, '</id><presetName>',
      preset.label,'</presetName></PTZPreset>'
    ].join('')
    return this.doXmlPut(url, xmlData)
  }

  readonly xmlHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
    })
  }

  private doXmlPut(url: string, xml: string): Observable<void> {
    return this.httpClient.put<void>(url, xml, this.xmlHttpOptions)
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  private doEmptyPut(url: string): Observable<void> {
    return this.httpClient.put<void>(url, {})
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  private handleHttpError(error: HttpErrorResponse) {
    let errorDetail = 'Unknown'
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message)
      errorDetail = error.error.message
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`)
      errorDetail = `Code ${error.status}`
    }
    // return an observable with a user-facing error message
    return throwError(errorDetail)
  };
}
