import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../Services/ProductService/product-details.service';

@Component({
  selector: 'app-condition',
  standalone: true,
  imports: [],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.css'
})
export class ConditionComponent implements OnInit {
  price:number = 0;

  @Output() variantClick = new EventEmitter<IVariantValues>();
  ngOnInit(): void {
    console.log(this.value);
    if (this.value.isAvailable) {
    // this.price= this.productDetailsService.selectedStockPrice(this.value.uuid);
    this.productDetailsService.loadSelectedStock(this.value.uuid).subscribe(stock=>{
      this.price= stock.price;
    })
    }
  }
  @Input() value!:IVariantValues;
  constructor(private productDetailsService:ProductDetailsService) {}

}
