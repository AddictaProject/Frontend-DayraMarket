import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from '../../Models/Product/All-Products/IProduct';
import { IProductParams } from '../../Models/Product/All-Products/IProductParams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  offerProduct!: IProduct ;
  isLoaded = false;
  numOfProducts: number = 11;
  pageNumber: number =1;
  tempArr:number[]=[];
  pageArr:number[]=[];
  maxPageNum:number = 0;
  totalCount:number = 0;
  brandsParams: string[] = [];
  categoriesPrams: string[] = [];
  maxPrice: number | null = null;
  constructor(private productApi:ProductApiService){}

  loadProducts(pageNum:number){
    this.isLoaded=false;
    this.pageNumber=pageNum;
    const tempNum=this.pageNumber ===1 ? this.numOfProducts-1: this.totalCount-(this.numOfProducts*(this.pageNumber-1));
    this.tempArr=Array(tempNum);

    const params: IProductParams = {
      rowCount: this.numOfProducts,
      pageNo: pageNum,
      brandUuids:this.brandsParams,
      categoryUuids:this.categoriesPrams,
    };

    if(this.maxPrice)
      params.maxPrice=this.maxPrice;

    this.productApi.getProducts(params).subscribe((products) => {
      let prods = products.result;
      prods.forEach((p) => {
        p.photos[0] = `https://dayra-market.addictaco.com${p.photos[0]}`;
        let colors: any = [];
        p.groupedVariants[0]?.values?.forEach((v: any) =>
          colors.push(v?.value)
        );
        p.groupedVariants = colors;
      });
      if(this.pageNumber==1)
      {
        this.offerProduct = prods[0];
        prods.splice(0,1);
      }
      this.products.next(prods);
      this.totalCount=products.totalCount;
      this.maxPageNum=Math.ceil(products.totalCount / this.numOfProducts );

      this.pageArr=Array(Math.abs(this.maxPageNum-1)).fill(0).map((_,i)=>i+1);
      this.isLoaded = true;
    });
  }


}
