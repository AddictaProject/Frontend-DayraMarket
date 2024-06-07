import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import {
  IgroupedVariants,
  IselectedStock as SelectedStock,
  Ivalues,
  IselectedStock,
  IProductInDetails,
} from '../../Models/Product/Prod-Details/IProductDetails';
import { VariantType } from '../../Models/Product/Prod-Details/enum/variant-type';
import { IProductDetailsParams } from '../../Models/Product/Prod-Details/IProductDetailsParams';
import { IVariantValues } from '../../Models/Product/Prod-Details/IVariantValues';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  availableAttributes: string[] = [];
  variantsGroup!: IgroupedVariants[];
  attributesValues!: Ivalues[];
  previousStockUuid: string = '';
  productUuid: string = '';
  mostPopularPrice: number = 0;
  lowestPrice: number = 0;
  price!: number;
  images: any[] = [];
  product!: IProductInDetails;
  activeItem: any;
  mostPopularAttributes: string[] = [];
  allAttributes:IVariantValues [][]=[];
  // allAttributes: { attributesUuid: string[]; values: IVariantValues[] }[] = [];

  constructor(private productApi: ProductApiService) {}

  loadProductVariant(id :string,lowestPrice: boolean = false) {
    this.rest();
    this.productApi
      .getProductDetails({
        productUuid: id,
        lowestPrice: lowestPrice,
        attributeValueUuid: '',
        previousStockUuid: '',
      })
      .subscribe((data) => {
        this.variantsGroup = data.product.groupedVariants;
        this.variantsGroup.forEach((variant) => {
          variant.type = this.getVariantType(
            variant.attributeDisplayName.toLowerCase()
          );
        });
        this.mostPopularAttributes=[];
        data.selectedStock.attributes.forEach((attribute) => {
          this.mostPopularAttributes.push(attribute.attributeValueUuid);
        });

        // For gallery:
        if (data && data.photoPaths) {
          this.images = data.product.photos.map((photo) => ({
            source: `https://dayra-market.addictaco.com${photo}`,
            thumbnail: `https://dayra-market.addictaco.com${photo}`,
          }));
        } else {
          console.log('Error in ProductDetails or photoPaths are missing');
        }

        this.availableAttributes = data.availableAttributes;
        this.previousStockUuid = data.selectedStock.uuid;
        this.productUuid = data.product.uuid;
        this.product = data.product;
        this.mostPopularPrice = data.selectedStock.price;
        this.lowestPrice = data.product.lowestPrice;
        this.price = this.mostPopularPrice;
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
        return VariantType.None;
    }
  }

  loadSelectedStock(attributeValueId: string,lowestPrice: boolean = false) {
    return this.productApi
      .getProductDetails({
        productUuid: this.productUuid,
        lowestPrice: lowestPrice,
        attributeValueUuid: attributeValueId,
        previousStockUuid: this.previousStockUuid,
      })
      .pipe(map((data) => data.selectedStock));
  }

  getSelectedStock(stockId: string,lowestPrice: boolean = false) {
    this.loadSelectedStock(stockId,lowestPrice).subscribe((stock) => {
      this.price = stock.price;
      this.previousStockUuid = stock.uuid;
      let stockAttributes:string [] = [];
      stock.attributes.forEach((attribute) => stockAttributes.push(attribute.attributeValueUuid));
      this.allAttributes.forEach(variables=>{
        variables.forEach(variable=>{
          if(stockAttributes.includes(variable.uuid))
            variable.isClicked=true;
          else
            variable.isClicked=false;
        })
      })
    });
  }

  // For Gallery
  setActiveItem(item: any): void {
    this.activeItem = item;
  }
  rest(){
  this.availableAttributes = [];
  this.variantsGroup=[];
  this.attributesValues=[];
  this.previousStockUuid = '';
  this.productUuid = '';
  this.mostPopularPrice = 0;
  this.lowestPrice = 0;
  this.price=0;
  this.images= [];
  this.activeItem;
  this.mostPopularAttributes = [];
  this.allAttributes=[];
  }
}
