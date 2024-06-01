import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../Shared/card/card.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { FilterSecComponent } from './filter-sec/filter-sec.component';
import { MobileFilterComponent } from './mobile-filter/mobile-filter.component';
import { OfferCardPlaceHolderComponent } from './offer-card-placeholder/offer-card-placeholder.component';
import { ProductService } from '../../../Services/ProductService/product.service';
import { CardPlaceholderComponent } from "../../Shared/card-placeholder/card-placeholder.component";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-products-page',
    standalone: true,
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.css',
    imports: [
        RouterModule,
        CardComponent,
        OfferCardComponent,
        FilterSecComponent,
        MobileFilterComponent,
        OfferCardPlaceHolderComponent,
        CardPlaceholderComponent,
        CommonModule
    ]
})
export class ProductsPageComponent implements OnInit {


  @ViewChild('paginationRef')  paginationRef!:ElementRef;
  constructor(public productService: ProductService) {}
  ngOnInit(): void {
    this.productService.loadProducts(1);
  }

  nextPage(){
    if(this.productService.pageNumber>=this.productService.maxPageNum )
      return;

    const spans:any= (this.paginationRef.nativeElement as HTMLElement).children ;
    [...spans].forEach((s:HTMLElement)=>{
      s.classList.remove('active');
    });
    spans[this.productService.pageNumber].classList.add('active');
    this.productService.pageNumber++;
    this.productService.loadProducts(this.productService.pageNumber)
  }
  goToPage(e:Event):void {
    const spans:any= (this.paginationRef.nativeElement as HTMLElement).children ;
    [...spans].forEach((s:HTMLElement)=>{
      s.classList.remove('active');
    });
    (e.target as HTMLElement).classList.add('active');
    let num=parseInt((e.target as HTMLElement).textContent ?? "0");
    if ( this.productService.pageNumber ===num)
      return
    this.productService.pageNumber=num;
    this.productService.loadProducts(num);
  }

}
