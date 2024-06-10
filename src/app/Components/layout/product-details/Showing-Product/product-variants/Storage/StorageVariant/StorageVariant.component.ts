import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../../Services/ProductService/product-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-StorageVariant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './StorageVariant.component.html',
  styleUrls: ['./StorageVariant.component.css']
})
export class StorageVariantComponent implements OnInit {

  @Input() value!:IVariantValues;
  @Output() variantClick = new EventEmitter<IVariantValues>();


  ngOnInit() {
  }

}
