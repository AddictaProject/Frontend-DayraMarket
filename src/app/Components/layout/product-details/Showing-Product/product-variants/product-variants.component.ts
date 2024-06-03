import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IgroupedVariants } from '../../../../../Models/Product/Prod-Details/IProductDetails';
import { VariantType } from '../../../../../Models/Product/Prod-Details/enum/variant-type';
import { IVariantValues } from '../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../Services/ProductService/product-details.service';
import { ConditionComponent } from "./condition/condition.component";



@Component({
    selector: 'app-product-variants',
    standalone: true,
    templateUrl: './product-variants.component.html',
    styleUrl: './product-variants.component.css',
    imports: [ConditionComponent]
})
export class ProductVariantsComponent implements OnInit {

  @Input() productVariants!: IgroupedVariants;

  values:IVariantValues[]=[];

  constructor(private productDetailsService:ProductDetailsService) { }

  ngOnInit(): void {
    this.productVariants.values.forEach(v=>{
      this.values.push({
        uuid:v.uuid,
        displayName:v.value,
        isClicked:false,
        isAvailable:this.productDetailsService.availableAttributes.includes(v.uuid)
      })
    })
  }

  test(val:IVariantValues){

    if (!val.isAvailable)
      return;

    this.values.forEach(val=>val.isClicked =false);
    val.isClicked=true;

    this.productDetailsService.getSelectedStock(val.uuid);
  }

}
