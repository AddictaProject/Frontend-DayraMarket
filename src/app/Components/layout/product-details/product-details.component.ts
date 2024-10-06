import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShowingProductComponent } from './Showing-Product/Showing-Product.component';
import { MightLikeComponent } from './might-like/might-like.component';
import { PairsWellComponent } from './pairs-well/pairs-well.component';
import { CommentsComponent } from './Comments/Comments.component';
import { ProductSliderComponent } from "../../Shared/product-slider/product-slider.component";
import { ProductService } from '../../../Services/ProductService/product.service';
import { ProductDetailsService } from '../../../Services/ProductService/product-details.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    RouterModule,
    ShowingProductComponent,
    MightLikeComponent,
    PairsWellComponent,
    CommentsComponent,
    ProductSliderComponent
],
})
export class ProductDetailsComponent implements OnDestroy   {
  productId!: string;
  constructor(
    private elementRef: ElementRef,
    public productService: ProductDetailsService
  ) {
  }
  ngOnDestroy(): void {
    document.body.style.cssText = '';
  }


  @ViewChild(CommentsComponent, { static: true }) commentComponent: CommentsComponent | undefined;



  scrollToCommentsSection() {
    if (this.commentComponent && this.commentComponent.elementRef) {
      this.commentComponent.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
