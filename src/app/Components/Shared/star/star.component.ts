import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapVue } from 'bootstrap-vue';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [RouterModule ,CommonModule ],
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() value !: number ;
  @Output() valueChange = new EventEmitter<number>();

  i =0;
  stars: boolean[] = Array(5).fill(false);

  constructor() {}
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && changes['value'].currentValue !== null) {
      this.updateStars(changes['value'].currentValue);
    }   
  }

  // Update stars based on the rating value
  updateStars(rating: number) {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = i < rating;
    }
  }

  rate(rating: number) {
    this.value = rating;
    this.valueChange.emit(this.value);
    this.updateStars(rating);
  }

}
