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
  mostPopularPrice: string = '';
  lowestPrice: string = '';
  price!: number;
  images: any[] = [];
  product!: IProductInDetails;
  activeItem: any;

  // allAttributes:IVariantValues [][]=[];
  allAttributes: { attributesUuid: string[]; values: IVariantValues[] }[] = [];

  constructor(private productApi: ProductApiService) {}

  loadProductVariant(id = 'bb015b57-50ac-4c48-965f-04e1f5d70d0f') {
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

        data.product.groupedVariants.forEach((v) => {
          let valueSelections = v.values.map((value) => {
            return {
              uuid: value.uuid,
              displayName: value.value,
              isClicked: false,
              isAvailable: false,
            };
          });
          this.allAttributes.push({
            attributesUuid: data.selectedStock.attributes.map((value) => value.attributeValueUuid),
            values: valueSelections,
          });
        });


        console.log(this.allAttributes);

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
        this.mostPopularPrice = data.selectedStock.price.toString();
        this.lowestPrice = data.product.lowestPrice.toString();
        this.price = data.product.lowestPrice;

    
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
      })
      .pipe(map((data) => data.selectedStock));
  }

  getSelectedStock(stockId: string) {
    this.loadSelectedStock(stockId).subscribe((stock) => {
      this.price = stock.price;
      this.previousStockUuid = stock.uuid;
      console.log(this.price + ' ' + stockId);
    });
  }

  // For Gallery
  setActiveItem(item: any): void {
    this.activeItem = item;
  }
}
