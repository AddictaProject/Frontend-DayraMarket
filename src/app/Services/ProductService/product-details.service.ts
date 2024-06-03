import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import {
  IgroupedVariants,
  IselectedStock as SelectedStock,
  Ivalues,
  IselectedStock,
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
  mostPopular: string = '';
  price!:number;
  constructor(private productApi: ProductApiService) {}

  loadProductVariant(id = '0e2798cb-7bf5-4eea-a8b8-84405f8a4046') {
    this.productApi
      .getProductDetails({
        productUuid: id,
        lowestPrice: false,
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
        this.availableAttributes = data.availableAttributes;
        this.previousStockUuid = data.selectedStock.uuid;
        this.productUuid = data.product.uuid;
        this.mostPopular = data.selectedStock.price.toString();
        this.price=data.product.lowestPrice;
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
  loadSelectedStock(attributeValueId: string) {
  return this.productApi
      .getProductDetails({
        productUuid: this.productUuid,
        lowestPrice: false,
        attributeValueUuid: attributeValueId,
        previousStockUuid: this.previousStockUuid,
      }).pipe(
        map(data=>data.selectedStock)
      );
  }

  getSelectedStock(stockId: string) {
    console.log("hi");
    this.loadSelectedStock(stockId).subscribe(stock=>{
      this.price=stock.price;
      this.previousStockUuid=stock.uuid;
      console.log("hi too");
    });
  }
}
