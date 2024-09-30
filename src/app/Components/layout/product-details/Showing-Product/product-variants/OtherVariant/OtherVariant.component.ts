import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../../Services/ProductService/product-details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-OtherVariant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './OtherVariant.component.html',
  styleUrls: ['./OtherVariant.component.css']
})
export class OtherVariantComponent implements OnInit {

  @Input() value!:IVariantValues;
  @Output() variantClick = new EventEmitter<IVariantValues>();


  ngOnInit() {
  }

}
