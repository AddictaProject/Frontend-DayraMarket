import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import {
  IgroupedVariants,
  ISelectedStock as SelectedStock,
  Ivalues,
  ISelectedStock,
  IProductInDetails,
  IProductDetails,
} from '../../Models/Product/Prod-Details/IProductDetails';
import { VariantType } from '../../Models/Product/Prod-Details/enum/variant-type';
import { IProductDetailsParams } from '../../Models/Product/Prod-Details/IProductDetailsParams';
import { IVariantValues } from '../../Models/Product/Prod-Details/IVariantValues';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import {
  IVendorReview,
  IVendorReviewParam,
} from '../../Models/Product/Prod-Details/ivendor-review';
import { Environment } from '../../../enviroment/environment';
import { IProduct } from '../../Models/Product/All-Products/IProduct';
import { IConditionPhoto } from '../../Models/Category/IConditionPhoto';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  url = Environment.serverURL;
  availableAttributes: string[] = [];
  product: IProductInDetails = {
    uuid: '',
    brandDisplayName: '',
    categoryDisplayName: '',
    description: '',
    displayName: '',
    groupedVariants: [],
    lowestPrice: 0,
    photos: [],
    reviewCount: 0,
    averageRate: 0,
    dateCreated: new Date(),
    comesWith: [],
    aspects: [],
  };
  previousStockUuid: string = '';
  mostPopularPrice: number = 0;
  lowestPrice: number = 0;
  price!: number;
  images: any[] = [];
  selectedStock!: ISelectedStock;
  activeItem: any;
  mostPopularAttributes: string[] = [];
  allAttributes: IVariantValues[][] = [];
  condition: string = '';
  color: string = '';
  mostPopularId: string = '';
  isActiveLowestPrice: boolean = false;
  isActiveMostPopular: boolean = true;
  isPageLoading: boolean = true;
  relatedProducts:IProduct[] = [];
  vendorId!: string;
  vendorDisplayName!: string;
  conditionPhoto:IConditionPhoto[]=[]
  private vendorReviewSubject = new BehaviorSubject<IVendorReview[]>([]);
  vendorReview$ = this.vendorReviewSubject.asObservable();
  isPageLoadingSubject = new BehaviorSubject<boolean>(true);
  constructor(private productApi: ProductApiService) {}

  loadProductVariant(
    id: string,
    lowestPrice: boolean = false,
    stockId: string = ''
  ) {
    this.rest();
    this.isPageLoading = true;
    this.productApi
      .getProductDetails({
        productUuid: id,
        lowestPrice: lowestPrice,
        attributeValueUuid: '',
        previousStockUuid: stockId,
      })
      .subscribe((data) => {
        this.product = data.product;
        this.selectedStock = data.selectedStock;
        this.product.groupedVariants.forEach((variant) => {
          variant.type = this.getVariantType(
            variant.attributeDisplayName.toLowerCase()
          );
        });
        this.mostPopularAttributes = [];
        data.selectedStock.attributes.forEach((attribute) => {
          this.mostPopularAttributes.push(attribute.attributeValueUuid);
          if (attribute.attributeDisplayName.toLowerCase() == 'color')
            this.color = attribute.attributeValue;
          else if (attribute.attributeDisplayName.toLowerCase() == 'condition')
            this.condition = attribute.attributeValue;
        });
        this.images =
          data.photoPaths.length > 0 ? data.photoPaths : data.product.photos;
        // For gallery:
        if (data && data.photoPaths) {
          this.images = this.images.map((photo) => ({
            source: `${this.url}${photo}`,
            thumbnail: `${this.url}${photo}`,
          }));
        } else {
          console.log('Error in ProductDetails or photoPaths are missing');
        }

        this.availableAttributes = data.availableAttributes;
        this.previousStockUuid = data.selectedStock.uuid;
        this.mostPopularPrice = data.selectedStock.price;
        this.mostPopularId = data.selectedStock.uuid;
        this.lowestPrice = data.product.lowestPrice;
        this.price = this.mostPopularPrice;
        this.isPageLoading = false;
        this.isPageLoadingSubject.next(false);
        this.vendorId = data.selectedStock.vendorUuid;
        this.vendorDisplayName = data.selectedStock.vendorDisplayName ?? '';

        this.loadConditionPhoto(this.product.uuid);

        if (this.product.reviewCount > 0) {
          this.loadReviews();
        }

        this.loadRelatedProducts(this.product.uuid);
      });
  }

  getVariantType(name: string) {
    switch (name) {
      case 'color':
        return VariantType.Color;
      case 'condition':
        return VariantType.Condition;
      case 'storage':
        return VariantType.Storage;
      default:
        return VariantType.Other;
    }
  }

  loadSelectedStock(attributeValueId: string, lowestPrice: boolean = false) {
    return this.productApi.getProductDetails({
      productUuid: this.product.uuid,
      lowestPrice: lowestPrice,
      attributeValueUuid: attributeValueId,
      previousStockUuid: this.previousStockUuid,
    });
  }

  getSelectedStock(val: IVariantValues, lowestPrice: boolean = false) {
    val.isLoading = true;
    this.loadSelectedStock(val.uuid, lowestPrice).subscribe((data) => {
      this.product = data.product;
      this.product.groupedVariants.forEach((variant) => {
        variant.type = this.getVariantType(
          variant.attributeDisplayName.toLowerCase()
        );
      });
      this.selectedStock = data.selectedStock;
      this.price = data.selectedStock.price;
      this.previousStockUuid = data.selectedStock.uuid;
      let stockAttributes: string[] = [];
      data.selectedStock.attributes.forEach((attribute) => {
        if (attribute.attributeDisplayName.toLowerCase() == 'color')
          this.color = attribute.attributeValue;
        else if (attribute.attributeDisplayName.toLowerCase() == 'condition')
          this.condition = attribute.attributeValue;

        stockAttributes.push(attribute.attributeValueUuid);
      });
      this.images =
        data.photoPaths.length > 0 ? data.photoPaths : data.product.photos;
      this.images = this.images.map((photo) => ({
        source: `${this.url}${photo}`,
        thumbnail: `${this.url}${photo}`,
      }));
      this.allAttributes.forEach((variables) => {
        variables.forEach((variable) => {
          if (stockAttributes.includes(variable.uuid))
            variable.isClicked = true;
          else variable.isClicked = false;
        });
      });

      if (this.price == this.lowestPrice) this.isActiveLowestPrice = true;
      else this.isActiveLowestPrice = false;

      if (this.previousStockUuid == this.mostPopularId)
        this.isActiveMostPopular = true;
      else this.isActiveMostPopular = false;

      val.isLoading = false;
      this.vendorId = data.selectedStock.vendorUuid;
      this.vendorDisplayName = data.selectedStock.vendorDisplayName ?? '';
      if (this.product.reviewCount > 0) {
        this.loadReviews();
      }
    });
  }

  // For Gallery
  setActiveItem(item: any): void {
    this.activeItem = item;
  }
  rest() {
    this.availableAttributes = [];
    this.previousStockUuid = '';
    this.mostPopularPrice = 0;
    this.lowestPrice = 0;
    this.price = 0;
    this.images = [];
    this.activeItem;
    this.mostPopularAttributes = [];
    this.allAttributes = [];
    this.condition = '';
    this.color = '';
    this.mostPopularId = '';
    this.isActiveLowestPrice = false;
    this.isActiveMostPopular = true;
    this.relatedProducts=[];
  }

  loadReviews(
    prodId: string = this.product.uuid,
    Vendid: string = this.vendorId,
    rate?: number
  ) {
    const reviewParams: IVendorReviewParam = {
      vendorUuid: Vendid,
      productUuid: prodId,
    };
    if (rate !== undefined) {
      reviewParams.rateFilter = rate;
    }

    this.productApi
      .getVendorReview(reviewParams)
      .subscribe((data: IVendorReview[]) => {
        this.vendorReviewSubject.next(data);
      });
  }

  loadRelatedProducts(productId: string){
    this.productApi.getRelatedProducts(productId).subscribe((products) => {
      this.relatedProducts = products;
      this.relatedProducts.forEach((p) => {
        p.photos[0] = `${Environment.serverURL}${p.photos[0]}`;
        let colors:any = [];
        p.groupedVariants?.find(x=>x.attributeDisplayName == 'Color')?.values?.forEach((v: any) =>
          colors.push(v?.hexCode)
        );
        p.groupedVariants = colors;
      });
    });
  }

  loadConditionPhoto(categoryId:string){
    this.productApi.getConditionPhotos(categoryId).subscribe(data=>{
      this.conditionPhoto = data;
    })
  }
}
