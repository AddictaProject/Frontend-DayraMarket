import {
  ChangeDetectorRef,
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
import { ProductApiService } from '../../../../Services/ProductService/product-api.service';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';

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
  ],
})
export class ShowingProductComponent implements OnInit {
  isActiveLowestPrice: boolean = false;
  isActiveMostPopular: boolean = true;
  isDragScrollDisabled: boolean = false;

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
    public _ProductDetailsService: ProductDetailsService,
    private route :ActivatedRoute ,
    public offCanvasOb: OffCanvasService,
    private cartService: CartService

  ) {}

  url!: string;

  ngOnInit() {
    // Calling data From ProductDetails Service
    let id = this.route.snapshot.paramMap.get('id') ??'';
    this._ProductDetailsService.productUuid=id;
    this._ProductDetailsService.loadProductVariant(id);
    // For getting the size of the screen
    this.checkScreenWidth(window.innerWidth);
    this.updateDragScrollStatus();
  }

  // Animation For Learn more
  animateLearnMore() {
    const element = this.LearnMore.nativeElement;
    element.classList.add('dissolve');
  }

  // offcanvas
  isOffCanvasVisible = false;
  toggleOffCanvas() {
    this.offCanvasOb.toggleOffcanvas(!this.isOffCanvasVisible);
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
      this.isActiveLowestPrice = true;
      this.isActiveMostPopular = false;
      this._ProductDetailsService.previousStockUuid ='';
      this._ProductDetailsService.price =
        +this._ProductDetailsService.lowestPrice;

        this._ProductDetailsService.getSelectedStock('',true);
    } else if (card === 'MostPopular') {
      this.isActiveMostPopular = true;
      this.isActiveLowestPrice = false;
      this._ProductDetailsService.price =
        +this._ProductDetailsService.mostPopularPrice;
        this._ProductDetailsService.previousStockUuid='';
      this._ProductDetailsService.getSelectedStock('');

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

  addItem(){
    const item:ICartItem={
      id:this._ProductDetailsService.previousStockUuid,
      name:this._ProductDetailsService.product.displayName,
      condition:this._ProductDetailsService.condition,
      color:this._ProductDetailsService.color,
      price:this._ProductDetailsService.price,
      image:`https://dayra-market.addictaco.com${this._ProductDetailsService.product.photos[0]}`,
      
    }
    this.cartService.addToCart(item);
  }
}
