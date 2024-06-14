import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffCanvasService {

  private offcanvasStateSubject = new BehaviorSubject<string | null>(null);
  offcanvasState$ = this.offcanvasStateSubject.asObservable();

  constructor() {}

  toggleOffcanvas(state: string | null): void {
    this.offcanvasStateSubject.next(state);
  }
  
}
