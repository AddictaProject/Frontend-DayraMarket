import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IgroupedVariants } from '../../../../../Models/Product/Prod-Details/IProductDetails';
import { VariantType } from '../../../../../Models/Product/Prod-Details/enum/variant-type';
import { IVariantValues } from '../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../Services/ProductService/product-details.service';
import { ConditionComponent } from './condition/condition.component';
import { StorageVariantComponent } from './Storage/StorageVariant/StorageVariant.component';
import { ColorComponent } from './Color/Color/Color.component';

@Component({
  selector: 'app-product-variants',
  standalone: true,
  templateUrl: './product-variants.component.html',
  styleUrl: './product-variants.component.css',
  imports: [ConditionComponent, StorageVariantComponent, ColorComponent],
})
export class ProductVariantsComponent implements OnInit {
  @ViewChild('LearnMore') LearnMore!: ElementRef;

  @Input() productVariants!: IgroupedVariants;

  values: IVariantValues[] = [];

  constructor(private productDetailsService: ProductDetailsService) {}

  ngOnInit(): void {
    // this.productVariants.values.forEach((v) => {
    //   this.values.push({
    //     uuid: v.uuid,
    //     displayName: v.value,
    //     isClicked: false,
    //     isAvailable: this.productDetailsService.availableAttributes.includes(
    //       v.uuid
    //     ),
    //   });
    // });

    // this.productDetailsService.allAttributes.forEach((attributeValues) => {
    //   attributeValues.values.forEach((value) => {
        
    //     this.productVariants.values.forEach((v2) => {
    //       this.values.push({
    //         uuid: v2.uuid,
    //         displayName: v2.value,
    //         isClicked: attributeValues.attributesUuid.includes(value.uuid),
    //         isAvailable:
    //           this.productDetailsService.availableAttributes.includes(v2.uuid),
    //       });
    //     });
    //   });
    // });

    this.productDetailsService.allAttributes.forEach((attributeValues) => {
      attributeValues.values.forEach((value) => {
        if (!this.values.some((v) => v.uuid === value.uuid)) {
          this.productVariants.values.forEach((v2) => {
            this.values.push({
              uuid: v2.uuid,
              displayName: v2.value,
              isClicked: attributeValues.attributesUuid.includes(value.uuid),
              isAvailable: this.productDetailsService.availableAttributes.includes(v2.uuid),
            });
          });
        }
      });
    });
    
    this.productVariants.type


    



    // console.log(this.productDetailsService.allAttributes);
    


  }

  test(val: IVariantValues) {
    if (!val.isAvailable) return;

    this.values.forEach((val) => (val.isClicked = false));
    val.isClicked = true;

    this.productDetailsService.getSelectedStock(val.uuid);
  }

  animateAndNavigate() {
    const element = this.LearnMore.nativeElement;

    element.classList.add('dissolveclass');

    setTimeout(() => {
      // this.router.navigate(['']);
    }, 100);
  }
}
