import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct } from '../../Models/Product/All-Products/IProduct';
import { IProductParams } from '../../Models/Product/All-Products/IProductParams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  brandId: string | undefined;
  products: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  offerProduct!: IProduct;
  isLoaded = false;
  numOfProducts: number = 11;
  pageNumber: number = 1;
  tempArr: number[] = [];
  maxPageNum: number = 0;
  totalCount: number = 6;
  lowestPrice: number = 1000;
  highestPrice: number = 10000;
  brandsParams: string[] = [];
  categoriesPrams: string[] = [];
  maxPrice: number | null = null;
  constructor(private productApi: ProductApiService) {}

  loadProducts(pageNum: number=1) {
    this.isLoaded = false;
    this.pageNumber = pageNum;
    const tempNum =
      this.pageNumber === 1
        ? this.numOfProducts - 1
        : this.totalCount - this.numOfProducts * (this.pageNumber - 1);
    this.tempArr = Array(tempNum);

    const params: IProductParams = {
      rowCount: this.numOfProducts,
      pageNo: pageNum,
      brandUuids: this.brandsParams,
      categoryUuids: this.categoriesPrams,
    };

    if (this.maxPrice) params.maxPrice = this.maxPrice;

    this.productApi.getProducts(params).subscribe((products) => {
      let prods = products.result;
      prods.forEach((p) => {
        p.photos[0] = `https://dayra-market.addictaco.com${p.photos[0]}`;
        let colors: any = [];
        p.groupedVariants[0]?.values?.forEach((v: any) =>
          colors.push(v?.hexCode)
        );
        p.groupedVariants = colors;
      });
      if (this.pageNumber == 1) {
        this.offerProduct = prods[0];
        prods.splice(0, 1);
      }
      this.products.next(prods);
      this.totalCount = products.totalCount;
      this.lowestPrice = products.lowestPrice;
      this.highestPrice = products.highestPrice;
      this.maxPageNum = Math.ceil(products.totalCount / this.numOfProducts);

      if (this.maxPageNum <= 3)
        document.querySelector('.p-paginator .p-paginator-last')?.classList.add('d-none');
      this.isLoaded = true;
    });
  }
  reset() {
    this.maxPrice = null;
    this.categoriesPrams = [];
    this.brandsParams = [];
    this.isLoaded = false;
    this.numOfProducts = 11;
    this.pageNumber = 1;
    this.tempArr = [];
    this.maxPageNum = 0;
    this.totalCount = 6;
    this.lowestPrice = 1000;
    this.highestPrice = 10000;
  }
}
