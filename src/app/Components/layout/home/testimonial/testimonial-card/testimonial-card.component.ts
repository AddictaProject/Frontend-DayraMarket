import { Component, Input } from '@angular/core';
import { TestimonialCard } from '../../../../../Models/Product/All-Products/testimonial-card';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.css'
})
export class TestimonialCardComponent {
  @Input() testimonial:TestimonialCard={
    name:'',
    rate:0,
    imageUrl:'',
    description:''
  };

  numbers:number[];
  constructor() {
    this.numbers = Array(5).fill(0).map((x,i)=>i+1);
  }
}
