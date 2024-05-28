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
  @Input() fullStarClass: string = 'full-star';
  @Input() halfStarClass: string = 'half-star';
  @Input() emptyStarClass: string = 'empty-star';
  
  stars: number[] = [];

  // stars: boolean[] = Array(5).fill(false);

  constructor() {}
  ngOnInit(): void {
    this.updateStars();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.updateStars();
    }
  }

  private updateStars(): void {
    this.stars = Array(5).fill(0).map((_, i) => {
      const starValue = i + 1;
      if (this.value >= starValue) {
        return 1;
      } else if (this.value >= starValue - 0.5) {
        return 0.5;
      } else {
        return 0;
      }
    });
  }
}
