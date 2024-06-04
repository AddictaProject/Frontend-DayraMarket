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
  isActiveMostPopular: boolean = false;
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
    private router: Router,
    private route: ActivatedRoute,
    private _ProductService: ProductApiService,
    public _ProductDetailsService: ProductDetailsService
  ) {}

  url!: string;

  ngOnInit() {
    // Calling data From ProductDetails Service
    this._ProductDetailsService.loadProductVariant();

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
  showOffCanvas() {
    this.isOffCanvasVisible = true;
  }
  hideOffCanvas() {
    this.isOffCanvasVisible = false;
  }


  // Best Picks
  toggleActive(card: string): void {
    if (card === 'LowestPrice') {
      this.isActiveLowestPrice = true;
      this.isActiveMostPopular = false;
    } else if (card === 'MostPopular') {
      this.isActiveMostPopular = true;
      this.isActiveLowestPrice = false;
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
}
