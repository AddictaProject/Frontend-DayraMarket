import {
  Attribute,
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
import { OffCanvasService } from '../../../../../Services/ProductService/offCanvas.service';

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
  isOffCanvasVisible = false;

  constructor(
    public productDetailsService: ProductDetailsService,
    private offCanvasOb: OffCanvasService
  ) {}

  ngOnInit(): void {
    this.productVariants.values.forEach((v) => {
      this.values.push({
        uuid: v.uuid,
        displayName: v.value,
        isClicked: this.productDetailsService.mostPopularAttributes.includes(
          v.uuid
        ),
        isAvailable: this.productDetailsService.availableAttributes.includes(
          v.uuid
        ),
      });
    });
    this.productDetailsService.allAttributes[this.productVariants.type] =
      this.values;
  }

  ClickingAction(val: IVariantValues) {
    if (!val.isAvailable) return;
    this.productDetailsService.getSelectedStock(val.uuid);
  }

  animateLearnMore() {
    const element = this.LearnMore.nativeElement;
    element.classList.add('dissolveclass');
  }

  toggleOffCanvas() {
    this.offCanvasOb.toggleOffcanvas(!this.isOffCanvasVisible);
  }
}
