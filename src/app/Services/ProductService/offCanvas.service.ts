import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffCanvasService {

  private isOffcanvasOpenSubject = new BehaviorSubject<boolean>(false);

  isOffcanvasOpen$ = this.isOffcanvasOpenSubject.asObservable();

  constructor() {}

  toggleOffcanvas(isOpen: boolean): void {
    this.isOffcanvasOpenSubject.next(isOpen);
  }
  
}
