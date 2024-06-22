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

@Component({
  selector: 'app-Header2',
  standalone: true,
  templateUrl: './Header2.component.html',
  styleUrls: ['./Header2.component.css'],
  imports: [RouterModule, CommonModule, SecondOffCanvasComponent],
})
export class Header2Component implements OnInit {
  category: ICategory[] = [];
  brands:IBrand[]=[];
  selectedCategory: any;
  // isOffcanvasOpen!: boolean ;
  currentOffcanvasState: string | null = null;

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
      },
      error(err) {
        console.log(err);
      },
    });
    this.filterService.getAllBrand().subscribe({
      next: (res: any) => {
        this.brands = res;
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

  smartTechList: string[] = [
    'iPhone',
    'MacBook',
    'iPad',
    'Apple Watch',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
  ];

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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { categoryId } });
    });
  }
  goToBrand(brandId: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { brandId } });
    });
  }
}
