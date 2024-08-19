import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-returns-and-refunds',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './returns-and-refunds.component.html',
  styleUrl: './returns-and-refunds.component.css'
})
export class ReturnsAndRefundsComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  navigateToSection(section: string) {
    const element = document.getElementById(section);

    if (element) {
        // Get the element's top position
        const elementPosition = element.getBoundingClientRect().top;
        // Get the current scroll position
        const currentScrollPosition = this.viewportScroller.getScrollPosition();
        // Scroll with the offset
        this.viewportScroller.scrollToPosition([currentScrollPosition[0], currentScrollPosition[1] + elementPosition - 150]);
    }
}
}
