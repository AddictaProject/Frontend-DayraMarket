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
  product: IProductInDetails={
    uuid:'',
    brandDisplayName:'',
    categoryDisplayName: '',
    description:'',
    displayName:'',
    groupedVariants:[],
    lowestPrice :0,
    photos:[],
  };
  activeItem: any;
  mostPopularAttributes: string[] = [];
  allAttributes:IVariantValues [][]=[];
  condition: string ='';
  color:string='';

  isLoading: boolean = false;
  constructor(private productApi: ProductApiService) {}



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
  }

  getSelectedStock(val: IVariantValues,lowestPrice: boolean = false) {
    // val.isLoading=true
    // this.loadSelectedStock(val.uuid,lowestPrice).subscribe((data) => {
    //   this.price = data.selectedStock.price;
    //   this.previousStockUuid = data.selectedStock.uuid;
    //   let stockAttributes:string [] = [];
    //   data.selectedStock.attributes.forEach((attribute) => {
    //    if( attribute.attributeDisplayName.toLowerCase()=="color")
    //       this.color=attribute.attributeValue;
    //     else if ( attribute.attributeDisplayName.toLowerCase()=="condition")
    //       this.condition=attribute.attributeValue;

    //     stockAttributes.push(attribute.attributeValueUuid)
    //   });
    //   this.images=data.photoPaths.length>0?data.photoPaths:data.product.photos;
    //   this.images = this.images.map((photo) => ({
    //     source: `https://dayra-market.addictaco.com${photo}`,
    //     thumbnail: `https://dayra-market.addictaco.com${photo}`,
    //   }));
    //   this.allAttributes.forEach(variables=>{
    //     variables.forEach(variable=>{
    //       if(stockAttributes.includes(variable.uuid))
    //         variable.isClicked=true;
    //       else
    //         variable.isClicked=false;
    //     })
    //   })
    //   val.isLoading=false
    // });
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
  this.condition='';
  this.color='';
  }
}
