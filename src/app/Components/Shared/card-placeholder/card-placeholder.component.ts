import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card-placeholder',
  standalone: true,
  imports: [SkeletonModule,CommonModule],
  templateUrl: './card-placeholder.component.html',
  styleUrl: './card-placeholder.component.css'
})
export class CardPlaceholderComponent {
  @Input() isProductPage: boolean = false;

}
