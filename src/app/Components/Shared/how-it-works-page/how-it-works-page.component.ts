import { Component } from '@angular/core';
import { IProductCondition } from '../../../Models/IProductCondition';
import { ProductSliderComponent } from '../../layout/home/product-slider/product-slider.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-how-it-works-page',
  standalone: true,
  imports: [ProductSliderComponent],
  templateUrl: './how-it-works-page.component.html',
  styleUrl: './how-it-works-page.component.css',
})
export class HowItWorksPageComponent {
  Conditions: IProductCondition[] = [
    {
      condition: 'Fair',
      screen:
        'Light scratches may be present but are barely noticeable when the device is on.',
      body: 'Might have some wear and tear, including scratches and dents. (Easily covered with a case!)',
      Hardware:
        '100% operational. Thoroughly tested, inspected, and cleaned by Dayra Market-approved refurbishers.',
      battery:
        'Good health: minimum 85% battery capacity. <br> Good performance for average daily use.',
    },
    {
      condition: 'Good',
      screen: 'Perfect. No signs of use, no scratches, absolutely nothing.',
      body: 'Lightly used. May have faint scratches that are barely noticeable unless viewed up close.',
      Hardware:
        '100% operational. Thoroughly tested, inspected, and cleaned by Dayra Market-approved refurbishers.',
      battery:
        'Good health: minimum 85% battery capacity. <br> Good performance for average daily use.',
    },
    {
      condition: 'Excellent',
      screen: 'Perfect. No signs of use, no scratches, absolutely nothing.',
      body: 'Minimal signs of use. May have barely visible hairline scratches that are hard to spot.',
      Hardware:
        '100% operational. Thoroughly tested, inspected, and cleaned by Dayra Market-approved refurbishers.',
      battery:
        'Good health: minimum 85% battery capacity. <br> Good performance for average daily use.',
    },
  ];

  constructor(private viewportScroller: ViewportScroller) {}

  changeCondition(e: Event, condition: string) {
    const btns = (e.target as HTMLElement).parentElement
      ?.querySelectorAll('button')
      .forEach((b) => b.classList.remove('active'));
    (e.target as HTMLElement).classList.add('active');

    const conditionInfo =
      (e.target as HTMLElement)
        .closest('section')
        ?.querySelectorAll('.condition-info p') ?? [];
    const selectedCondition = this.Conditions.find(
      (c) => c.condition.toLowerCase() == condition.toLowerCase()
    );

    conditionInfo[0].innerHTML = selectedCondition?.screen ?? ' ';
    conditionInfo[1].innerHTML = selectedCondition?.body ?? ' ';
    conditionInfo[2].innerHTML = selectedCondition?.Hardware ?? ' ';
    conditionInfo[3].innerHTML = selectedCondition?.battery ?? ' ';
  }
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
