import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key !== 'Tab' && key !== 'Backspace' && (key < '0' || key > '9')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

}
