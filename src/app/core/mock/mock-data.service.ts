import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  /** Mock video URL */
  public getMockVideoUrl() {
    return [
      {
        Flv: '',
        Hls: '',
        Priority: 0,
      },
      {
        Flv: '',
        Hls: '',
        Priority: 1,
      },
      {
        Flv: '',
        Hls: '',
        Priority: 2,
      }
    ];
  }
}
