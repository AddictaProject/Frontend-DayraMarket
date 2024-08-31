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
import { Router, RouterModule } from '@angular/router';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { OffCanvasListsService } from '../../../../Services/HeaderService/OffCanvasLists.service';
import { ICategory } from '../../../../Models/Category/ICategory';
import { SecondOffCanvasComponent } from './secondOffCanvas/secondOffCanvas.component';
import { IBrand } from '../../../../Models/Brand/IBrand';
import { FilterApiService } from '../../../../Services/FilterServices/filter-api.service';
import { SkeletonModule } from 'primeng/skeleton';
import { Environment } from '../../../../../enviroment/environment';

@Component({
  selector: 'app-Header2',
  standalone: true,
  templateUrl: './Header2.component.html',
  styleUrls: ['./Header2.component.css'],
  imports: [RouterModule, CommonModule, SecondOffCanvasComponent,SkeletonModule],
})
export class Header2Component implements OnInit {
  category: ICategory[] = [];
  brands:IBrand[]=[];
  selectedCategory: any;
  // isOffcanvasOpen!: boolean ;
  currentOffcanvasState: string | null = null;
  isBrandLoaded: boolean = false;
  isCategoryLoaded: boolean = false;
  url=Environment.serverURL;
  constructor(
    private offCanvasOb: OffCanvasService,
    private renderer: Renderer2,
    private filterService: FilterApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.offCanvasOb.offcanvasState$.subscribe((state) => {
      this.currentOffcanvasState = state;
    });

    this.filterService.getAllCategories().subscribe({
      next: (res: any) => {
        this.category = res;
        this.isCategoryLoaded=true;
      },
      error(err) {
        console.log(err);
      },
    });
    this.filterService.getAllBrand().subscribe({
      next: (res: any) => {
        this.brands = res;
        this.isBrandLoaded=true;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // offcanvas
  toggleOffCanvas(state: string | null) {
    this.offCanvasOb.toggleOffcanvas(state);
  }


  showOffCanvas(category: ICategory) {
    this.selectedCategory = category;
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (additionalOffCanvas) {
      additionalOffCanvas.classList.add('show');
      this.renderer.addClass(document.body, 'offcanvas-open');
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (
      additionalOffCanvas &&
      !additionalOffCanvas.contains(target) &&
      !target.closest('.categoryOffCanvas')
    ) {
      this.closeAdditionalOffCanvas();
    }
  }

  closeAdditionalOffCanvas() {
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (additionalOffCanvas) {
      additionalOffCanvas.classList.remove('show');
      this.renderer.removeClass(document.body, 'offcanvas-open');
    }
  }
  goToCategory(categoryId: string) {
    document.querySelectorAll('.offcanvas').forEach(x=>x.classList.remove('show'))
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
