import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CAMERAS, Camera } from '../mock-data/cameras.mock';

@Injectable({ providedIn: 'root' })
export class CamerasService {
  list(): Observable<Camera[]> {
    return of(CAMERAS);
  }
}

