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
import { CarouselModule } from 'primeng/carousel';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-variants',
  standalone: true,
  templateUrl: './product-variants.component.html',
  styleUrl: './product-variants.component.css',
  imports: [ConditionComponent, StorageVariantComponent, ColorComponent,CarouselModule],
})
export class ProductVariantsComponent implements OnInit {
  @ViewChild('LearnMore') LearnMore!: ElementRef;

  @Input() productVariants!: IgroupedVariants;

  values: IVariantValues[] = [];
  isOffCanvasVisible = false;
  responsiveOptions!: { breakpoint: string; numVisible: number; numScroll: number; }[];
  img!: never[];

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
        isLoading:false
      });
    });
    this.productDetailsService.allAttributes[this.productVariants.type] =
      this.values;

    // carousal

    this.img=[]

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

  }

  ClickingAction(val: IVariantValues) {
    if (val.isClicked) return;
    this.productDetailsService.getSelectedStock(val);
  }

  animateLearnMore() {
    const element = this.LearnMore.nativeElement;
    element.classList.add('dissolveclass');
  }

  toggleOffCanvas(state: string | null) {
    this.offCanvasOb.toggleOffcanvas(state);
  }
}
