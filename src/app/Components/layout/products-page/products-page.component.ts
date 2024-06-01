import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../Shared/card/card.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { FilterSecComponent } from './filter-sec/filter-sec.component';
import { MobileFilterComponent } from './mobile-filter/mobile-filter.component';
import { OfferCardPlaceHolderComponent } from './offer-card-placeholder/offer-card-placeholder.component';
import { ProductService } from '../../../Services/ProductService/product.service';
import { IProductParams } from '../../../Models/IProductParams';
import { IProduct } from '../../../Models/IProduct';
import { CardPlaceholderComponent } from "../../Shared/card-placeholder/card-placeholder.component";

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
        CardPlaceholderComponent
    ]
})
export class ProductsPageComponent implements OnInit {
  products: IProduct[] = [];
  offerProduct!: IProduct ;
  isLoaded = false;
  numOfProducts: number = 11;
  pageNumber: number =1;
  tempArr:number[]=[];
  pageArr:number[]=[];
  maxPageNum:number = 0;
  totalCount:number = 0;

  @ViewChild('paginationRef')  paginationRef!:ElementRef;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts(1);
  }


  loadProducts(pageNum:number){
    this.isLoaded=false;

    const tempNum=this.pageNumber ===1 ? this.numOfProducts-1: this.totalCount-(this.numOfProducts*(this.pageNumber-1));
    this.tempArr=Array(tempNum);

    const params: IProductParams = {
      rowCount: this.numOfProducts,
      pageNo: pageNum,
    };
    this.productService.getProducts(params).subscribe((products) => {
      this.products = products.result;
      this.products.forEach((p) => {
        p.photos[0] = `https://dayra-market.addictaco.com${p.photos[0]}`;
        let colors: any = [];
        p.groupedVariants[0]?.values?.forEach((v: any) =>
          colors.push(v?.value)
        );
        p.groupedVariants = colors;
      });
      if(this.pageNumber==1)
      {
        this.offerProduct = this.products[0];
        this.products.splice(0,1);
      }
      this.totalCount=products.totalCount;
      this.maxPageNum=Math.ceil(products.totalCount / this.numOfProducts );
      this.pageArr=Array(this.maxPageNum-1).fill(0).map((_,i)=>i+1);
      this.isLoaded = true;
    });
  }
  nextPage(){
    if(this.pageNumber>=this.maxPageNum )
      return;

    const spans:any= (this.paginationRef.nativeElement as HTMLElement).children ;
    [...spans].forEach((s:HTMLElement)=>{
      s.classList.remove('active');
    });
    spans[this.pageNumber].classList.add('active');
    this.pageNumber++;
    this.loadProducts(this.pageNumber)
  }
  goToPage(e:Event):void {

    const spans:any= (this.paginationRef.nativeElement as HTMLElement).children ;
    [...spans].forEach((s:HTMLElement)=>{
      s.classList.remove('active');
    });
    (e.target as HTMLElement).classList.add('active');
    let num=parseInt((e.target as HTMLElement).textContent ?? "0");
    if ( this.pageNumber ===num)
      return
    this.pageNumber=num;
    this.loadProducts(num);
  }

}
