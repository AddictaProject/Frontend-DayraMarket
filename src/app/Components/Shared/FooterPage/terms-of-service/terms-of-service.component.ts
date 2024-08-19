import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css'
})
export class TermsOfServiceComponent {
  constructor(private viewportScroller: ViewportScroller) {}
  navigateToSection(section: string) {
    const element = document.getElementById(section);

    if (element) {
      // Get the element's top position
      const elementPosition = element.getBoundingClientRect().top;
      // Get the current scroll position
      const currentScrollPosition = this.viewportScroller.getScrollPosition();
      // Scroll with the offset
      this.viewportScroller.scrollToPosition([
        currentScrollPosition[0],
        currentScrollPosition[1] + elementPosition - 150,
      ]);
    }
  }

}
