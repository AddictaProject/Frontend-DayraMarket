import { Component } from '@angular/core';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { CardComponent } from '../../../Shared/card/card.component';

import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../../Services/ProductService/product.service';
import { IProduct } from '../../../../Models/IProduct';
import { IProductParams } from '../../../../Models/IProductParams';
import { CardPlaceholderComponent } from '../../../Shared/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css',
  imports: [DragScrollComponent, DragScrollItemDirective, CardComponent,CardPlaceholderComponent],
})
export class ProductSliderComponent {
  isLoaded =false;
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private httpClient: HttpClient
  ) {
    const productParams: IProductParams = {
      pageNo: 1,
      rowCount: 8,
    };
    productService.getProducts(productParams).subscribe((products) => {
      this.products = products.result;
      this.products.forEach((p) => {
        p.photos[0] = `https://dayra-market.addictaco.com${p.photos[0]}`;
        let colors:any = [];
        p.groupedVariants[0]?.values?.forEach((v:any) => colors.push(v?.value));
        p.groupedVariants=colors;
      });
      this.isLoaded=true;
    });

  }
}
