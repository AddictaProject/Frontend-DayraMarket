import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../../Services/ProductService/product-details.service';

@Component({
  selector: 'app-StorageVariant',
  standalone: true,
  imports: [],
  templateUrl: './StorageVariant.component.html',
  styleUrls: ['./StorageVariant.component.css']
})
export class StorageVariantComponent implements OnInit {

  @Input() value!:IVariantValues;
  @Output() variantClick = new EventEmitter<IVariantValues>();

  constructor() { }

  ngOnInit() {
  }

}
