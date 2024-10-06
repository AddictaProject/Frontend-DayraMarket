import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { OffCanvasListsService } from '../../../../Services/HeaderService/OffCanvasLists.service';
import { ICategory } from '../../../../Models/Category/ICategory';
import { SecondOffCanvasComponent } from './secondOffCanvas/secondOffCanvas.component';
import { IBrand } from '../../../../Models/Brand/IBrand';
import { FilterApiService } from '../../../../Services/FilterServices/filter-api.service';
import { SkeletonModule } from 'primeng/skeleton';
import { Environment } from '../../../../../enviroment/environment';
import { LocalizationService } from '../../../../Services/localiztionService/localization.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-Header2',
  standalone: true,
  templateUrl: './Header2.component.html',
  styleUrls: ['./Header2.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    SecondOffCanvasComponent,
    SkeletonModule,
  ],
})
export class Header2Component implements OnInit {
  category: ICategory[] = [];
  brands: IBrand[] = [];
  selectedCategory!: ICategory;
  isArabic: boolean = false;

  @ViewChild('barsRef') barsRef!: ElementRef;
  @ViewChild('offcanvasRef') offcanvasRef!: ElementRef;
  // isOffcanvasOpen!: boolean ;
  currentOffcanvasState: string | null = null;
  isBrandLoaded: boolean = false;
  isCategoryLoaded: boolean = false;
  url = Environment.serverURL;
  constructor(
    private offCanvasOb: OffCanvasService,
    private renderer: Renderer2,
    private filterService: FilterApiService,
    private router: Router,
    private localizationService: LocalizationService
  ) {}
  ngOnInit() {
    this.localizationService.IsArabic.subscribe(
      (isAr) => (this.isArabic = isAr)
    );

    this.offCanvasOb.offcanvasState$.subscribe((state) => {
      this.currentOffcanvasState = state;
    });

    this.filterService.getAllCategories().subscribe({
      next: (res: any) => {
        this.category = res;
        this.selectedCategory = res[0];
        this.isCategoryLoaded = true;
      },
      error(err) {
        console.log(err);
      },
    });
    this.filterService.getAllBrand().subscribe({
      next: (res: any) => {
        this.brands = res;
        this.isBrandLoaded = true;
      },
      error(err) {
        console.log(err);
      },
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const isOpen = (
          this.offcanvasRef.nativeElement as HTMLElement
        ).classList.contains('show');
        if (isOpen)
          (this.barsRef.nativeElement as HTMLElement).click();
      });
  }

  // offcanvas
  toggleOffCanvas(state: string | null) {
    this.offCanvasOb.toggleOffcanvas(state);
    const additionalOffCanvas = document.getElementById('additionalSidebar');
    if (additionalOffCanvas) additionalOffCanvas.classList.remove('show');
  }

  showOffCanvas(category: ICategory) {
    this.selectedCategory = category;
    const additionalOffCanvas = document.getElementById('additionalSidebar');
    if (additionalOffCanvas) {
      additionalOffCanvas.classList.add('show');
    }
  }

  goToCategory(categoryId: string) {
    document
      .querySelectorAll('.offcanvas')
      .forEach((x) => x.classList.remove('show'));
    this.renderer.removeClass(document.body, 'offcanvas-open');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { categoryId } });
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  goToBrand(brandId: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { brandId } });
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
