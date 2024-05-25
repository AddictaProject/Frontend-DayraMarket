import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TestimonialCardComponent } from "./testimonial-card/testimonial-card.component";
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { TestimonialCard } from '../../../../Models/testimonial-card';

@Component({
    selector: 'app-testimonial',
    standalone: true,
    templateUrl: './testimonial.component.html',
    styleUrl: './testimonial.component.css',
    imports: [TestimonialCardComponent,DragScrollComponent,DragScrollItemDirective]
})
export class TestimonialComponent implements AfterViewInit {
  @ViewChild('scrollerRef') scrollerRef!:any;

  testimonials: TestimonialCard[]= [
    {
      name: "Jane Smith",
      rate: 5,
      imageUrl: "assets/images/testimonial-1.png",
      description: "Lorem ipsum dolor sit amet consectetuTellus consectetur integsectetuTellusconsecteturntegeratinteger pelleesque "
    },
    {
      name: "Tom Williams",
      rate: 3,
      imageUrl: "assets/images/testimonial-2.png",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus co donec leo rutrum id in egestas Cras donec."
    },
    {
      name: "Jane Smith",
      rate: 2,
      imageUrl: "assets/images/testimonial-1.png",
      description: "Lorem ipsum dolor sit amet consectetuTellus consectetur integsectetuTellusconsecteturntegeratinteger pelleesque "
    },
    {
      name: "Tom Williams",
      rate: 4,
      imageUrl: "assets/images/testimonial-2.png",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus co donec leo rutrum id in egestas Cras donec."
    },
    {
      name: "Jane Smith",
      rate: 5,
      imageUrl: "assets/images/testimonial-1.png",
      description: "Lorem ipsum dolor sit amet consectetuTellus consectetur integsectetuTellusconsecteturntegeratinteger pelleesque "
    },
    {
      name: "Tom Williams",
      rate: 3,
      imageUrl: "assets/images/testimonial-2.png",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus co donec leo rutrum id in egestas Cras donec."
    },
    {
      name: "Jane Smith",
      rate: 2,
      imageUrl: "assets/images/testimonial-1.png",
      description: "Lorem ipsum dolor sit amet consectetuTellus consectetur integsectetuTellusconsecteturntegeratinteger pelleesque "
    },
    {
      name: "Tom Williams",
      rate: 4,
      imageUrl: "assets/images/testimonial-2.png",
      description: "Lorem ipsum dolor sit amet consectetur. Tellus co donec leo rutrum id in egestas Cras donec."
    }
  ];
  ngAfterViewInit(): void {

  }
  goLeft(): void {
    const scroller= this.scrollerRef._elementRef.nativeElement as HTMLElement;
    const first=scroller.querySelectorAll('app-testimonial-card')[0].scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }
  goRight(){
    const scroller= this.scrollerRef._elementRef.nativeElement as HTMLElement;
    const last=scroller.querySelectorAll('app-testimonial-card')[scroller.querySelectorAll('app-testimonial-card').length-1].scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}
