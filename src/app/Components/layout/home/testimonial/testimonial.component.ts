import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TestimonialCardComponent } from './testimonial-card/testimonial-card.component';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { TestimonialCard } from '../../../../Models/Product/All-Products/testimonial-card';
import { LocalizationService } from '../../../../Services/localiztionService/localization.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css',
  imports: [
    TestimonialCardComponent,
    DragScrollComponent,
    DragScrollItemDirective,
    CommonModule,
    TranslateModule
  ],
})
export class TestimonialComponent implements AfterViewInit ,OnInit {
  @ViewChild('scrollerRef') scrollerRef!: any;
  isArabic: boolean = false;

  constructor(private localizationService: LocalizationService) {}
  ngOnInit(): void {
    this.localizationService.IsArabic.subscribe(isAr=>this.isArabic=isAr);
  }

  testimonials: TestimonialCard[] = [
    {
      name: 'Mostafa Saed',
      rate: 5,
      imageUrl: 'assets/images/testimonial-1.png',
      description:
        'Amazing price for such a great phone! The phone arrived in secure packaging, and it is in better condition than advertised! I recommend Dayra Market to anyone who wants to buy a refurbished phone!',
    },
    {
      name: 'Yara Ahmed',
      rate: 5,
      imageUrl: 'assets/images/testimonial-2.png',
      description:
        'I had never purchased a refurbished phone before, so at the beginning I was a bit worried if the iPhone 13 that I ordered would be in a condition as described on the website. I received the phone yesterday and it looks and works perfectly. Also, I was surprised how smooth the transaction and delivery process worked so kudos to Dayra Market! I’m sure I will use Dayra again in the future!',
    },
    {
      name: 'Nour Abdel Rahman',
      rate: 4,
      imageUrl: 'assets/images/testimonial-1.png',
      description:
        'I bought multiple refurbished electronics (mostly laptops and phones) in the past, but it was my first transaction at Dayra Market. The transaction went very smoothly, and I got the laptop that I ordered in just 2 days. The condition of the laptop was exactly as described! I’m super happy with my purchase!',
    },
    {
      name: 'Tarek Mahmoud',
      rate: 4,
      imageUrl: 'assets/images/testimonial-2.png',
      description:
        'The iPad that I ordered was exactly in the condition described on the website, it arrived very fast and was nicely and securely packaged. I can recommend Dayra Market to everyone!.',
    },
    {
      name: 'Taylor Ismail',
      rate: 5,
      imageUrl: 'assets/images/testimonial-1.png',
      description:
        'The refurbished iPhone 14 that I got is indistinguishable from a brand-new one. Also, the way it was packaged made it feel like I got a new phone.',
    },
    {
      name: 'Sarah Abdel Rahim',
      rate: 4,
      imageUrl: 'assets/images/testimonial-2.png',
      description:
        'Easy transaction process, fast delivery, and the laptop exactly matching the description. I’m sure I will buy more things from Dayra Market in the future.',
    },
    {
      name: 'Rania Sadek',
      rate: 5,
      imageUrl: 'assets/images/testimonial-1.png',
      description:
        'Last week I bought a phone from my mom, and I can recommend Dayra Market to all my friends and family. The phone looks like new; the delivery was very fast and the packaging looked very professional. Great job Dayra Market! ',
    },
  ];
  ngAfterViewInit(): void {}
  goLeft(): void {
    const scroller = this.scrollerRef._elementRef.nativeElement as HTMLElement;
    const first = scroller
      .querySelectorAll('app-testimonial-card')[0]
      .scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }
  goRight() {
    const scroller = this.scrollerRef._elementRef.nativeElement as HTMLElement;
    const last = scroller
      .querySelectorAll('app-testimonial-card')
      [
        scroller.querySelectorAll('app-testimonial-card').length - 1
      ].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }
}
