import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-slider',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.css'
})
export class BrandSliderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.addAnimation();
    }

  }

  @ViewChild('scrollerRef') scrollerRef!:ElementRef;



  addAnimation(){
    const scroller = this.scrollerRef.nativeElement;
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item : any) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  }
}
