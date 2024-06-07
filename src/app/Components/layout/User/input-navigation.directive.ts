import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputNavigation]',
  standalone: true,
})
export class InputNavigationDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    console.log(key);
    if (key !== 'Tab' && key !== 'Backspace' && (key < '0' || key > '9')) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    const key = event.key;
    const inputs = Array.from(document.querySelectorAll('input'));
    const selectedInput = event.target as HTMLInputElement;

    const index = inputs.indexOf(selectedInput);

    if (selectedInput.value === '') {
      selectedInput.parentElement?.classList.remove('input');
    } else selectedInput.parentElement?.classList.add('input');

    let nextIndex = (index + 1) % inputs.length;
    if (key === 'Backspace') {
      nextIndex-=2;
      nextIndex = nextIndex == 0 ?  inputs.length-2 : nextIndex;
    }
    else
      nextIndex = nextIndex == inputs.length - 1 ? 1 : nextIndex;
    inputs[nextIndex].focus();
    inputs[nextIndex].select();
  }
}
