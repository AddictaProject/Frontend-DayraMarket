import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../Services/ProductService/product-details.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-condition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.css'
})
export class ConditionComponent implements OnInit,OnDestroy {
  price:number = 0;


  @Input() value!:IVariantValues;
  @Output() variantClick = new EventEmitter<IVariantValues>();

  sub!:Subscription;
  constructor(public productDetailsService:ProductDetailsService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    // console.log(this.value);
    if (this.value.isAvailable) {
    this.sub=this.productDetailsService.loadSelectedStock(this.value.uuid).subscribe(data=>{
      this.price= data.selectedStock.price;
    })
    }
  }

}
