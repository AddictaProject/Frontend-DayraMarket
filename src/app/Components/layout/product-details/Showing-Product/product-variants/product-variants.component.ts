import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IgroupedVariants } from '../../../../../Models/Product/Prod-Details/IProductDetails';
import { VariantType } from '../../../../../Models/Product/Prod-Details/enum/variant-type';
import { IVariantValues } from '../../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductDetailsService } from '../../../../../Services/ProductService/product-details.service';
import { ConditionComponent } from './condition/condition.component';
import { OffCanvasService } from '../../../../../Services/ProductService/offCanvas.service';
import { CarouselModule } from 'primeng/carousel';
import { IProductCondition } from '../../../../../Models/IProductCondition';
import { RouterModule } from '@angular/router';
import { ColorComponent } from './Color/Color.component';
import { OtherVariantComponent } from './OtherVariant/OtherVariant.component';
import { Environment } from '../../../../../../enviroment/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-variants',
  standalone: true,
  templateUrl: './product-variants.component.html',
  styleUrl: './product-variants.component.css',
  imports: [
    ConditionComponent,
    OtherVariantComponent,
    ColorComponent,
    CarouselModule,
    RouterModule,
    TranslateModule,
  ],
})
export class ProductVariantsComponent implements OnInit {
  @ViewChild('LearnMore') LearnMore!: ElementRef;
  @ViewChild('sliderIndicators') sliderIndicators!: ElementRef;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('btnsContainer') btnsContainer!: ElementRef;

  @Input() productVariants!: IgroupedVariants;

  values: IVariantValues[] = [];
  isOffCanvasVisible = false;
  responsiveOptions!: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[];

  conditions: IProductCondition[] = [
    {
      condition: 'Fair',
      screen:
        'Light scratches may be present but are barely noticeable when the device is on.',
      body: 'Might have some wear and tear, including scratches and dents. (Easily covered with a case!)',
      Hardware:
        '100% operational. Thoroughly tested, inspected, and cleaned by Dayra Market-approved refurbishers.',
      battery:
        'Good health: minimum 85% battery capacity. <br> Good performance for average daily use.',
    },
    {
      condition: 'Good',
      screen: 'Perfect. No signs of use, no scratches, absolutely nothing.',
      body: 'Lightly used. May have faint scratches that are barely noticeable unless viewed up close.',
      Hardware:
        '100% operational. Thoroughly tested, inspected, and cleaned by Dayra Market-approved refurbishers.',
      battery:
        'Good health: minimum 85% battery capacity. <br> Good performance for average daily use.',
    },
    {
      condition: 'Excellent',
      screen: 'Perfect. No signs of use, no scratches, absolutely nothing.',
      body: 'Minimal signs of use. May have barely visible hairline scratches that are hard to spot.',
      Hardware:
        '100% operational. Thoroughly tested, inspected, and cleaned by Dayra Market-approved refurbishers.',
      battery:
        'Good health: minimum 85% battery capacity. <br> Good performance for average daily use.',
    },
  ];
  img!: never[];

  url: string = Environment.serverURL;

  VariantType = VariantType;
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
        isLoading: false,
        hexCode: v?.hexCode,
      });
    });
    this.productDetailsService.allAttributes[this.productVariants.type] =
      this.values;
    // carousal

    this.img = [];

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
    setTimeout(() => {
      const element = this.LearnMore?.nativeElement;
      element?.classList.add('dissolveclass');
    }, 1000);
  }

  toggleOffCanvas(state: string | null) {
    this.offCanvasOb.toggleOffcanvas(state);
  }

  changeCondition(condition: string) {
    const btns = this.btnsContainer.nativeElement
      ?.querySelectorAll('button')
      .forEach((b: any) => b.classList.remove('active'));
    const currentBtn = this.btnsContainer.nativeElement.querySelector(
      `.${condition}`
    );

    currentBtn.classList.add('active');

    const conditionInfo =
      currentBtn
        .closest('.product-header')
        ?.querySelectorAll('.txtOfPropSubOff') ?? [];
    const selectedCondition = this.conditions.find(
      (c) => c.condition.toLowerCase() == condition.toLowerCase()
    );

    conditionInfo[0].innerHTML = selectedCondition?.screen ?? ' ';
    conditionInfo[1].innerHTML = selectedCondition?.body ?? ' ';
  }

  changeConditionInImage(isNext:boolean) {
    let currentElem =
      this.sliderContainer.nativeElement.querySelector(
        '.active'
      ).nextElementSibling;

    if (!currentElem && isNext){
      if(isNext)
        currentElem = this.sliderContainer.nativeElement.firstElementChild;
      else
        currentElem = this.sliderContainer.nativeElement.lastElementChild;

    }

    this.changeCondition(currentElem.dataset['condition']);
  }
  changeConditionInBtn(condition: string){
    let clickedImg =
      this.sliderContainer?.nativeElement.querySelector(
        `.${condition}`
      );

    let clickedIndicator =
      this.sliderIndicators?.nativeElement.querySelector(
        `.${condition}`
      );

      if (!clickedImg || !clickedIndicator)
        this.sliderContainer?.nativeElement.classList.add('d-none');
      else
        clickedIndicator.click();

      this.changeCondition(condition);
  }
}
