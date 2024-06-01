import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { GalleriaModule } from 'primeng/galleria';
import { IProductDetails } from '../../../../Models/IProductDetails';
import { IProductDetailsParams } from '../../../../Models/IProductDetailsParams';
import { Subscription } from 'rxjs';
import { ProductApiService } from '../../../../Services/ProductService/product-api.service';

@Component({
  selector: 'app-Showing-Product',
  standalone: true,
  templateUrl: './Showing-Product.component.html',
  styleUrls: ['./Showing-Product.component.css'],
  imports: [
    RouterModule,
    FormsModule,
    GalleriaModule,
    DragScrollComponent,
    DragScrollItemDirective,
  ],
})
export class ShowingProductComponent implements OnInit, OnDestroy {
  images: any[] = [];
  activeItem: any;
  ProductId: string = '0e2798cb-7bf5-4eea-a8b8-84405f8a4046';
  ProductDetails!: IProductDetails;
  ProductDetailsParams!: IProductDetailsParams;
  sub!: Subscription;
  productPrice!: number;
  mostPopularPrice!: number;

  EnableValues!: any[];

  responsiveOptions: any[] = [
    {
      breakpoint: '912px',
      numVisible: 4,
    },
    {
      breakpoint: '500px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  @ViewChild('LearnMore') LearnMore!: ElementRef;


  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private _ProductService: ProductApiService
  ) { }

  url!: string;


  ngOnInit() {
    // For getting the size of the screen
    this.checkScreenWidth(window.innerWidth);
    this.updateDragScrollStatus();

    // Subscribe to getProductDetails:
    this.route.params.subscribe((params) => {
      this.ProductDetailsParams = params['ProductDetailsParams'];


      if (this.ProductId) {
        this.ProductDetailsParams = {
          productUuid: this.ProductId,
          lowestPrice: false,
        };
        if (this.sub) {
          this.sub.unsubscribe();
        }


        this.sub = this._ProductService
          .getProductDetails(this.ProductDetailsParams)
          .subscribe({
            next: (Product) => {
              this.ProductDetails = Product;

              // For gallery:
              if (this.ProductDetails && this.ProductDetails.photoPaths) {
                this.images = this.ProductDetails.photoPaths.map((photo) => ({
                  source: `https://dayra-market.addictaco.com${photo}`,
                  thumbnail: `https://dayra-market.addictaco.com${photo}`,
                }));
              } else {
                console.log('Error in ProductDetails or photoPaths');
              }

              //For the price :

              // update the price on the top
              if (
                !this.ProductDetailsParams.lowestPrice ||
                (this.ProductDetailsParams.previousStockUuid == null &&
                  this.ProductDetailsParams.attributeValueUuid == null)
              ) {
                this.productPrice = this.ProductDetails.product.lowestPrice;
              } else {
                this.productPrice = this.ProductDetails.selectedStock.price;
              }

              //Most PopularPrice
              if (this.ProductDetailsParams.lowestPrice == false) {
                this.mostPopularPrice = this.ProductDetails.selectedStock.price;
              }

              // For variants :

              console.log(
              );

              for (
                let i = 0;
                i <
                this.ProductDetails.product.groupedVariants[1].values.length;
                i++
              ) {
                if (
                  this.ProductDetails.availableAttributes[i] ==
                  this.ProductDetails.product.groupedVariants[1].values[i].uuid
                ) {
                  console.log('hii');

                  this.EnableValues.push(
                    this.ProductDetails.product.groupedVariants[1].values[i]
                      .value
                  );
                }
                console.log(this.EnableValues);
              }
            },
            error: (error) => {
              console.error('Error fetching product details', error);
            },
          });

      } else {
        console.error('ProductId is undefined');
      }
    });
  }


  setActiveItem(item: any): void {
    this.activeItem = item;
  }

  animateAndNavigate() {
    const element = this.LearnMore.nativeElement;

    element.classList.add('dissolve');

    setTimeout(() => {
      // this.router.navigate(['best-picks']);
    }, 100);
  }

  // offcanvas

  isOffCanvasVisible = false;

  showOffCanvas() {
    this.isOffCanvasVisible = true;
  }

  hideOffCanvas() {
    this.isOffCanvasVisible = false;
  }

  // Styling the beside gallery section

  // Best Picks
  // For LowestPrice
  isActiveLowestPrice: boolean = false;

  // For Most Popular
  isActiveMostPopular: boolean = false;

  toggleActive(card: string): void {
    if (card === 'LowestPrice') {
      this.isActiveLowestPrice = true;
      this.isActiveMostPopular = false;
    } else if (card === 'MostPopular') {
      this.isActiveMostPopular = true;
      this.isActiveLowestPrice = false;
    }
  }

  //Condition
  // Fair
  isActiveFair: boolean = false;
  // Good
  isActiveGood: boolean = false;
  // Excellent
  isActiveExcellent: boolean = false;

  toggleActiveCondition(card: string): void {
    if (card === 'Fair') {
      this.isActiveFair = true;
      this.isActiveGood = false;
      this.isActiveExcellent = false;
    } else if (card === 'Good') {
      this.isActiveGood = true;
      this.isActiveFair = false;
      this.isActiveExcellent = false;
    } else if (card === 'Excellent') {
      this.isActiveGood = false;
      this.isActiveFair = false;
      this.isActiveExcellent = true;
    }
  }

  //Storage
  // 128
  is128: boolean = false;
  // 256
  is256: boolean = false;
  // 512
  is512: boolean = false;

  toggleActiveStorage(card: string): void {
    if (card === '128') {
      this.is128 = true;
      this.is256 = false;
      this.is512 = false;
    } else if (card === '256') {
      this.is128 = false;
      this.is256 = true;
      this.is512 = false;
    } else if (card === '512') {
      this.is128 = false;
      this.is256 = false;
      this.is512 = true;
    }
  }

  // color
  // For Grey
  isActiveGrey: boolean = false;

  // For Silver
  isActiveSilver: boolean = false;

  toggleActiveColor(card: string): void {
    if (card === 'Grey') {
      this.isActiveGrey = true;
      this.isActiveSilver = false;
    } else if (card === 'Silver') {
      this.isActiveSilver = true;
      this.isActiveGrey = false;
    }
  }

  // responsive!!
  thumbnailsPosition: 'bottom' | 'top' | 'left' | 'right' | undefined = 'left';

  // for galleria
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth(event.target.innerWidth);
    this.updateDragScrollStatus();
  }
  checkScreenWidth(width: number) {
    if (width <= 1399) {
      this.thumbnailsPosition = 'bottom';
    } else {
      this.thumbnailsPosition = 'left';
    }
  }

  // for scroll
  isDragScrollDisabled: boolean = false;

  updateDragScrollStatus() {
    this.isDragScrollDisabled = window.innerWidth <= 991;
  }

  // destroy !!
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
