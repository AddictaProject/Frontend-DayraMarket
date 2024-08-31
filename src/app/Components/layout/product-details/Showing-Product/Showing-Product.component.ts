import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { GalleriaModule } from 'primeng/galleria';
import { ProductApiService } from '../../../../Services/ProductService/product-api.service';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { BehaviorSubject } from 'rxjs';
import { IVariantValues } from '../../../../Models/Product/Prod-Details/IVariantValues';
import { ProductPlaceholderComponent } from '../product-placeholder/product-placeholder.component';
import { SkeletonModule } from 'primeng/skeleton';
import { VariantType } from '../../../../Models/Product/Prod-Details/enum/variant-type';
import { Environment } from '../../../../../enviroment/environment';

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
    ProductVariantsComponent,
    ProductPlaceholderComponent,
    SkeletonModule,

  ],
})
export class ShowingProductComponent implements OnInit ,AfterViewInit {
  isDragScrollDisabled: boolean = false;
  private imgUrl!: string;
   Url!: string;

   @ViewChild('stickyHeaderRef') stickyHeader!: ElementRef;
   isVisible = false;
  @Output() scrollToCommentEvent = new EventEmitter<void>();



  mostPriceValue: IVariantValues = {
    uuid: '',
    displayName: '',
    isClicked: false,
    isAvailable: false,
    isLoading: false,
  };
  lowestPriceValue: IVariantValues = {
    uuid: '',
    displayName: '',
    isClicked: false,
    isAvailable: false,
    isLoading: false,
  };

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
  VariantType = VariantType
  @ViewChild('LearnMore') LearnMore!: ElementRef;

  constructor(
    public _ProductDetailsService: ProductDetailsService,
    private route: ActivatedRoute,
    public offCanvasOb: OffCanvasService,
    private cartService: CartService,
    private router: Router
  ) {
    this.imgUrl = Environment.serverURL + this._ProductDetailsService.product.photos[0];
    this.Url = Environment.serverURL ;

  }
  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  url!: string;

  ngOnInit() {
    let id = '';
    if (history.state?.id) id = history.state.id;
    else this.router.navigate(['/']);

    let stockId = '';
    if (history.state?.stockId)
      stockId = history.state.stockId;

    // Calling data From ProductDetails Service

    this._ProductDetailsService.productUuid = id;
    this._ProductDetailsService.loadProductVariant(id, false, stockId);
    // For getting the size of the screen
    this.checkScreenWidth(window.innerWidth);
    this.updateDragScrollStatus();



  }

  // Animation For Learn more
  animateLearnMore() {
    const element = this.LearnMore.nativeElement;
    element.classList.add('dissolve');
  }

  // toggleOffcanvas for Header !!
  toggleOffCanvas(state: string | null) {
    this.offCanvasOb.toggleOffcanvas(state);
  }

  // Frequently asked questions
  openMenu(event: Event) {
    const filterMenu = (event.currentTarget as HTMLElement).closest(
      '.filter-menu'
    );
    const icon = filterMenu?.querySelector('i.fa-solid');

    if (icon) {
      icon.classList.toggle('fa-angle-down');
      icon.classList.toggle('fa-angle-up');
    }
    filterMenu?.querySelector('.menu')?.classList.toggle('d-none');
  }

  // Best Picks
  toggleActive(card: string): void {
    if (card === 'LowestPrice') {
      this._ProductDetailsService.isActiveLowestPrice = true;
      this._ProductDetailsService.isActiveMostPopular = false;
      this._ProductDetailsService.previousStockUuid = '';
      this._ProductDetailsService.price =
        +this._ProductDetailsService.lowestPrice;

      this._ProductDetailsService.getSelectedStock(this.lowestPriceValue, true);
    } else if (card === 'MostPopular') {
      this._ProductDetailsService.isActiveMostPopular = true;
      this._ProductDetailsService.isActiveLowestPrice = false;
      this._ProductDetailsService.price =
        +this._ProductDetailsService.mostPopularPrice;
      this._ProductDetailsService.previousStockUuid = '';
      this._ProductDetailsService.getSelectedStock(this.mostPriceValue);
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
  updateDragScrollStatus() {
    this.isDragScrollDisabled = window.innerWidth <= 991;
  }

  addItem() {
    const item: ICartItem = {
      id: this._ProductDetailsService.previousStockUuid,
      name: this._ProductDetailsService.product.displayName,
      condition: this._ProductDetailsService.condition,
      color: this._ProductDetailsService.color,
      price: this._ProductDetailsService.price,
      image: this._ProductDetailsService.images[0].thumbnail,
      productId: this._ProductDetailsService.productUuid,
    };
    this.cartService.addToCart(item);
    this.router.navigate(['/cart']);
  }

  // Scrolling From More to Comments
  scrollToComments() {
    this.scrollToCommentEvent.emit();
  }

  setupIntersectionObserver() {
    const options = {
      root: null, // Use the viewport as the container
      threshold: .1 // Trigger when 10% of the target is visible
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          this.isVisible = true; // Show div when the marker is out of view
        } else {
          this.isVisible = false; // Hide div when the marker is in view
        }
      });
    }, options);

    observer.observe(this.stickyHeader.nativeElement);
  }
}
