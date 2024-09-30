import { Component, Input, OnInit } from '@angular/core';
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
export class ProductSliderComponent implements OnInit {
  @Input() Title:string ="" ;
  @Input() categoryId!:string ;
  isLoaded =false;
  products: IProduct[] = [];
  constructor(
    private productService: ProductApiService,
    private httpClient: HttpClient
  ) {


  }
  ngOnInit(): void {
    const productParams: IProductParams = {
      pageNo: 1,
      rowCount: 8,
    };
    if(this.categoryId) {
      productParams.categoryUuids = [this.categoryId];
    }
    this.productService.getProducts(productParams).subscribe((products) => {
      this.products = products.result;
      this.products.forEach((p) => {
        p.photos[0] = `${Environment.serverURL}${p.photos[0]}`;
        let colors:any = [];
        p.groupedVariants?.find(x=>x.attributeDisplayName == 'Color')?.values?.forEach((v: any) =>
          colors.push(v?.hexCode)
        );
        p.groupedVariants = colors;
      });
      this.isLoaded=true;
    });
  }
}
