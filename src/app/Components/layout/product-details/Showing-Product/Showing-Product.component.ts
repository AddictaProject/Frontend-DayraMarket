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
import { IVariantValues } from '../../../../Models/Product/Prod-Details/IVariantValues';
import { Subscription } from 'rxjs';

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
export class ShowingProductComponent implements OnInit ,OnDestroy {
  isActiveLowestPrice: boolean = false;
  isActiveMostPopular: boolean = true;
  isDragScrollDisabled: boolean = false;
  sub:Subscription[]=[];
  mostPriceValue:IVariantValues={
    uuid: '',
    displayName: '',
    isClicked: false,
    isAvailable: false,
    isLoading: false,
  }
  lowestPriceValue:IVariantValues={
    uuid: '',
    displayName: '',
    isClicked: false,
    isAvailable: false,
    isLoading: false,
  }

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
    public productDetailsService: ProductDetailsService,
    private route :ActivatedRoute ,
    public offCanvasOb: OffCanvasService,
    private cartService: CartService,
    private router: Router

  ) {}
  ngOnDestroy(): void {
    this.sub.forEach(s=>s.unsubscribe());
  }

  url!: string;

  ngOnInit() {
    // Calling data From ProductDetails Service
    let id = this.route.snapshot.paramMap.get('id') ??'';
    this.productDetailsService.productUuid=id;
    this.productDetailsService.loadProductVariant(id);
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
      this.productDetailsService.previousStockUuid ='';
      this.productDetailsService.price =
        +this.productDetailsService.lowestPrice;

        this.getSelectedStock(this.lowestPriceValue,true);
    } else if (card === 'MostPopular') {
      this.isActiveMostPopular = true;
      this.isActiveLowestPrice = false;
      this.productDetailsService.price =
        +this.productDetailsService.mostPopularPrice;
        this.productDetailsService.previousStockUuid='';
      this.getSelectedStock(this.mostPriceValue);

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
      id:this.productDetailsService.previousStockUuid,
      name:this.productDetailsService.product.displayName,
      condition:this.productDetailsService.condition,
      color:this.productDetailsService.color,
      price:this.productDetailsService.price,
      image:`https://dayra-market.addictaco.com${this.productDetailsService.product.photos[0]}`,

    }
    this.cartService.addToCart(item);
    this.router.navigate(['/cart']);

  }
  getSelectedStock(val: IVariantValues,lowestPrice: boolean = false) {
    val.isLoading=true
   this.sub.push(
     this.productDetailsService.loadSelectedStock(val.uuid,lowestPrice).subscribe((data) => {
      this.productDetailsService.price = data.selectedStock.price;
      this.productDetailsService.previousStockUuid = data.selectedStock.uuid;
      let stockAttributes:string [] = [];
      data.selectedStock.attributes.forEach((attribute) => {
       if( attribute.attributeDisplayName.toLowerCase()=="color")
          this.productDetailsService.color=attribute.attributeValue;
        else if ( attribute.attributeDisplayName.toLowerCase()=="condition")
          this.productDetailsService.condition=attribute.attributeValue;

        stockAttributes.push(attribute.attributeValueUuid)
      });
      this.productDetailsService.images=data.photoPaths.length>0?data.photoPaths:data.product.photos;
      this.productDetailsService.images = this.productDetailsService.images.map((photo) => ({
        source: `https://dayra-market.addictaco.com${photo}`,
        thumbnail: `https://dayra-market.addictaco.com${photo}`,
      }));
      this.productDetailsService.allAttributes.forEach(variables=>{
        variables.forEach(variable=>{
          if(stockAttributes.includes(variable.uuid))
            variable.isClicked=true;
          else
            variable.isClicked=false;
        })
      })
      val.isLoading=false
    }));
  }

}
