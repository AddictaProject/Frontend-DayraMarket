import { Component } from '@angular/core';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { CardComponent } from "../../../Shared/card/card.component";

import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../../Services/ProductService/product.service';

@Component({
    selector: 'app-product-slider',
    standalone: true,
    templateUrl: './product-slider.component.html',
    styleUrl: './product-slider.component.css',
    imports: [DragScrollComponent,DragScrollItemDirective,CardComponent]
})
export class ProductSliderComponent {
  constructor(private productService: ProductService,private httpClient: HttpClient) {
    productService.getProducts().subscribe(products=>{
      console.log(products);
    });

  }

}
