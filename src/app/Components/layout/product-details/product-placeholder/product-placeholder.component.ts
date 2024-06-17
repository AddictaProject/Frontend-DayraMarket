import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-placeholder',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './product-placeholder.component.html',
  styleUrl: './product-placeholder.component.css'
})
export class ProductPlaceholderComponent {

}
