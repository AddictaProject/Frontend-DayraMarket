import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { IProduct } from '../../../Models/IProduct';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,SkeletonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() isProductPage: boolean = false;
  @Input() isSlider: boolean = false;
  @Input() product:IProduct={
    uuid:'',
    displayName:'I Phone 14',
    lowestPrice :11000,
    description:'128 GB - PURPLE',
    photos:['assets/images/prd.png'],
    groupedVariants:[],
    averageRate:5
  };
  descriptions:string[]=[];
  ngOnInit(): void {
    this.descriptions= this.product.description.split('-');
  }
}
