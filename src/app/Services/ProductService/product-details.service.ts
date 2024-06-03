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
          variant.type = this.variantType(
            variant.attributeDisplayName.toLowerCase()
          );
        });
        this.availableAttributes = data.availableAttributes;
        this.previousStockUuid = data.selectedStock.uuid;
        this.productUuid = data.product.uuid;
        this.mostPopular = data.selectedStock.price.toString();
      });
  }

  variantType(name: string) {
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
      })
      ;
  }

  getSelectedStock(product :IVariantValues) {
    product.isClicked=true;

    this.loadSelectedStock(product.uuid).subscribe(d=>{
      console.log(d);
    });
  }
}
