import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '../../Shared/card/card.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { FilterSecComponent } from './filter-sec/filter-sec.component';
import { MobileFilterComponent } from './mobile-filter/mobile-filter.component';
import { OfferCardPlaceHolderComponent } from './offer-card-placeholder/offer-card-placeholder.component';
import { ProductService } from '../../../Services/ProductService/product.service';
import { CardPlaceholderComponent } from '../../Shared/card-placeholder/card-placeholder.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FilterService } from '../../../Services/FilterServices/filter.service';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  imports: [
    RouterModule,
    CardComponent,
    OfferCardComponent,
    FilterSecComponent,
    MobileFilterComponent,
    OfferCardPlaceHolderComponent,
    CardPlaceholderComponent,
    CommonModule,
    PaginatorModule,
    TranslateModule
  ],
})
export class ProductsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('paginationRef') paginationRef!: ElementRef;
  isArabic: boolean = false;

  constructor(
    public productService: ProductService,
    private filterService: FilterService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    if (this.router.url.includes('search')) {
      productService.searchResult = history.state?.searchResult ?? '';
    } else {
      if (history.state?.brandId)
        productService.brandsParams.push(history.state.brandId);

      if (history.state?.categoryId)
        productService.categoriesPrams.push(history.state.categoryId);

    }

    filterService.loadBrands();
    filterService.loadCategories();
  }
  ngAfterViewInit(): void {
    document
      .querySelector('.p-paginator .p-paginator-first')
      ?.classList.add('d-none');
    document
      .querySelector('.p-paginator .p-paginator-prev')
      ?.classList.add('d-none');
  }
  ngOnDestroy(): void {
    this.productService.reset();
    this.filterService.reset();
  }
  ngOnInit(): void {
    this.localizationService.IsArabic.subscribe(isAr=>this.isArabic=isAr);
    this.productService.loadProducts(1);
  }

  goToPage(e: any): void {
    if (this.productService.pageNumber === e.page + 1) return;

    if (e.page + 1 == 1) {
      document
        .querySelector('.p-paginator .p-paginator-first')
        ?.classList.add('d-none');
      document
        .querySelector('.p-paginator .p-paginator-prev')
        ?.classList.add('d-none');
    } else {
      document
        .querySelector('.p-paginator .p-paginator-prev')
        ?.classList.remove('d-none');
      if (this.productService.maxPageNum > 3)
        document
          .querySelector('.p-paginator .p-paginator-first')
          ?.classList.remove('d-none');
    }
    if (e.page + 1 == this.productService.maxPageNum) {
      document
        .querySelector('.p-paginator .p-paginator-last')
        ?.classList.add('d-none');
      document
        .querySelector('.p-paginator .p-paginator-next')
        ?.classList.add('d-none');
    } else {
      document
        .querySelector('.p-paginator .p-paginator-next')
        ?.classList.remove('d-none');
      if (this.productService.maxPageNum > 3)
        document
          .querySelector('.p-paginator .p-paginator-last')
          ?.classList.remove('d-none');
    }

    this.productService.pageNumber = e.page + 1;
    this.productService.loadProducts(this.productService.pageNumber);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
