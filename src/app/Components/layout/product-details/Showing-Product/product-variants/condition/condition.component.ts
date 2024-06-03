import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IVariantValues } from '../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../Services/ProductService/product-details.service';

@Component({
  selector: 'app-condition',
  standalone: true,
  imports: [],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.css'
})
export class ConditionComponent implements OnChanges {
  price:number = 0;
  ngOnChanges(): void {
    if (this.value.isAvailable) {
    // this.price= this.productDetailsService.selectedStockPrice(this.value.uuid);
    this.productDetailsService.getSelectedStock(this.value.uuid).subscribe(stock=>{
      this.price= stock.selectedStock.price;
    })
    }
  }
  @Input() value!:IVariantValues;
  constructor(private productDetailsService:ProductDetailsService) {}

}
