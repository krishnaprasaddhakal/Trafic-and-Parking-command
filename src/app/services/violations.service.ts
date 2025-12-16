import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Violation, VIOLATIONS } from '../mock-data/violations.mock';

@Injectable({ providedIn: 'root' })
export class ViolationsService {
  list(): Observable<Violation[]> {
    return of(VIOLATIONS);
  }
}

