import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../Services/ProductService/product-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-condition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.css'
})
export class ConditionComponent implements OnInit {
  price:number = 0;


  @Input() value!:IVariantValues;
  @Output() variantClick = new EventEmitter<IVariantValues>();

  constructor(public productDetailsService:ProductDetailsService) {}

  ngOnInit(): void {
  }

}
