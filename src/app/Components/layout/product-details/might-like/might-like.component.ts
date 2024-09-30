import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { CardProductDetailsComponent } from '../../../Shared/card-product-details/card-product-details.component';
import { CardComponent } from '../../../Shared/card/card.component';
import { IProduct } from '../../../../Models/Product/All-Products/IProduct';
import { ProductApiService } from '../../../../Services/ProductService/product-api.service';
import { IProductParams } from '../../../../Models/Product/All-Products/IProductParams';
import { Environment } from '../../../../../enviroment/environment';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';

@Component({
  selector: 'app-might-like',
  standalone: true,
  templateUrl: './might-like.component.html',
  imports: [RouterModule , CardProductDetailsComponent,DragScrollComponent,
    DragScrollItemDirective ,CardComponent],
  styleUrls: ['./might-like.component.css']
})
export class MightLikeComponent implements OnInit  {
  constructor(
    public productService: ProductDetailsService
  ) {


  }
  ngOnInit(): void {


  }

}
