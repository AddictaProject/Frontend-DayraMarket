import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { IProduct } from '../../../Models/Product/All-Products/IProduct';
import { Router, RouterModule } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,SkeletonModule,RouterModule],
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
  constructor(
    private router: Router
  ) {}

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`/${url}`,{state:{ id:this.product.uuid}} )

    });
  }
}
