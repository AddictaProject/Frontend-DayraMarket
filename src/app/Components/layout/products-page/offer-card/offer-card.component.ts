import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../Models/Product/All-Products/IProduct';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  standalone: true,
  imports: [ CommonModule,RouterModule],
  templateUrl: './offer-card.component.html',
  styleUrl: './offer-card.component.css'
})
export class OfferCardComponent implements OnInit  {
  @Input() product:IProduct={
    uuid:'',
    displayName:'',
    lowestPrice :0,
    description:'',
    photos:['assets/images/prd.png'],
    groupedVariants:[],
    averageRate:5
  }

  descriptions:string[]=[];
  ngOnInit(): void {
    this.descriptions= this.product.description.split('-');
  }
}
