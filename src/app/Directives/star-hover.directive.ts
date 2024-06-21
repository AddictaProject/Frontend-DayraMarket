import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[StarHover]',
  standalone: true,
})
export class StarHoverDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: Event) {
    let currentElem = event.srcElement as HTMLElement;
    const allElem = Array.from(currentElem.parentElement?.children ?? []);
    for (const elem of allElem) {
      elem.classList.add('hover');
      if (currentElem==elem) {
        break;
      }
    }
  }
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: Event) {
    let currentElem = event.srcElement as HTMLElement;
    const allElem = Array.from(currentElem.parentElement?.children ?? []);
    for (const elem of allElem) {
      elem.classList.remove('hover');
      if (currentElem==elem) {
        break;
      }
    }
  }
}
