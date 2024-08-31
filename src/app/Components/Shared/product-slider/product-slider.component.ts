import { Component, Input } from '@angular/core';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { CardComponent } from '../../Shared/card/card.component';

import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../../Models/Product/All-Products/IProduct';
import { IProductParams } from '../../../Models/Product/All-Products/IProductParams';
import { CardPlaceholderComponent } from '../../Shared/card-placeholder/card-placeholder.component';
import { ProductApiService } from '../../../Services/ProductService/product-api.service';
import { RouterModule } from '@angular/router';
import { Environment } from '../../../../enviroment/environment';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css',
  imports: [DragScrollComponent, DragScrollItemDirective, CardComponent,CardPlaceholderComponent ,RouterModule],
})
export class ProductSliderComponent {
  @Input() Title:string ="" ;
  isLoaded =false;
  products: IProduct[] = [];
  constructor(
    private productService: ProductApiService,
    private httpClient: HttpClient
  ) {
    const productParams: IProductParams = {
      pageNo: 1,
      rowCount: 8,
    };
    productService.getProducts(productParams).subscribe((products) => {
      this.products = products.result;
      this.products.forEach((p) => {
        p.photos[0] = `${Environment.serverURL}${p.photos[0]}`;
        let colors:any = [];
        p.groupedVariants[0]?.values?.forEach((v:any) => colors.push(v?.value));
        p.groupedVariants=colors;
      });
      this.isLoaded=true;
    });

  }
}
