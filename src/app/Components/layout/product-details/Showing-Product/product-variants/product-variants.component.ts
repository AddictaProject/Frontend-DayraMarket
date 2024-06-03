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
export class ProductVariantsComponent implements OnChanges {
  @Input() productVariants!: IgroupedVariants;

  constructor(private productDetailsService:ProductDetailsService) { }
  values:IVariantValues[]=[];

  ngOnChanges(changes: SimpleChanges): void {
    this.productVariants.values.forEach(v=>{
      this.values.push({
        uuid:v.uuid,
        displayName:v.value,
        isClicked:false,
        isAvailable:this.productDetailsService.availableAttributes.includes(v.uuid)
      })
    })

    console.log(this.values);
  }




}
