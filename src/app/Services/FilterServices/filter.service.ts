import { ElementRef, Injectable, OnInit } from '@angular/core';

import { FilterApiService } from './filter-api.service';
import { IBrand } from '../../Models/Brand/IBrand';
import { ICategory } from '../../Models/Category/ICategory';
import { ProductService } from '../ProductService/product.service';
import { IProductParams } from '../../Models/Product/All-Products/IProductParams';
import { CheckboxFilter } from '../../Models/Product/All-Products/CheckboxFilter';
import { ProductApiService } from '../ProductService/product-api.service';
import { FilterType } from '../../Models/Product/All-Products/FilterType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  brands: IBrand[] = [];
  categories: ICategory[] = [];

  categoriesCheckbox: CheckboxFilter[] = []; //for All Categories
  brandsCheckbox: CheckboxFilter[] = [];
  checkedCategories: CheckboxFilter[] = []; //  for checked only
  checkedBrands: CheckboxFilter[] = [];
  categoriesFiltered: CheckboxFilter[] = []; // for display
  brandsFiltered: CheckboxFilter[] = [];
  isBrandsHasChecked: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isCategoryHasChecked: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private filterApiService: FilterApiService,
    public productService: ProductService
  ) {}

  openFilterMenu(elem: HTMLElement) {
    elem.classList.toggle('fa-plus');
    elem.classList.toggle('fa-minus');
    const filterMenu = elem.closest('.filter-menu');
    filterMenu?.classList.toggle('active');
    filterMenu?.querySelector('.menu')?.classList.toggle('d-none');
  }

  getChecked(filter: CheckboxFilter) {
    filter.isChecked = !filter.isChecked;
    if (filter.type === FilterType.Brand) {
      let selected1Indx =
        this.brandsFiltered.findIndex((b) => b.id === filter.id);
      let selected2Indx =
        this.brandsCheckbox.findIndex((b) => b.id === filter.id);

      if (filter.isChecked) {
        this.checkedBrands.push(filter);
        this.brandsFiltered[selected1Indx].isChecked = this.brandsCheckbox[selected2Indx].isChecked  = true;
        this.brandsFiltered.some((b,i)=>{
          if (selected1Indx==i && b.isChecked)
            return true;

          if (!b.isChecked) {
            [this.brandsFiltered[i],this.brandsFiltered[selected1Indx]]=[this.brandsFiltered[selected1Indx],this.brandsFiltered[i]];
            (this.brandsFiltered[i].elemRef as HTMLInputElement).checked=false;
            return true;
          }
          return false
        })
      } else {
        const idx = this.checkedBrands.findIndex((f) => f.id == filter.id);
        this.checkedBrands.splice(idx, 1);
        this.brandsFiltered[selected1Indx].isChecked = this.brandsCheckbox[selected2Indx].isChecked = false;
      }
    } else if (filter.type === FilterType.Category) {
      let selected1Indx =
        this.categoriesFiltered.findIndex((b) => b.id === filter.id);
      let selected2Indx =
        this.categoriesCheckbox.findIndex((b) => b.id === filter.id);
      if (filter.isChecked) {
        this.checkedCategories.push(filter);
        this.categoriesFiltered[selected1Indx].isChecked = this.categoriesCheckbox[selected2Indx].isChecked = true;
        this.categoriesFiltered.some((b,i)=>{
          if (selected1Indx==i && b.isChecked)
            return true;

          if (!b.isChecked) {
            [this.categoriesFiltered[i],this.categoriesFiltered[selected1Indx]]=[this.categoriesFiltered[selected1Indx],this.categoriesFiltered[i]];
            (this.categoriesFiltered[i].elemRef as HTMLInputElement).checked=false;
            return true;
          }
          return false
        })
      } else {
        const idx = this.checkedCategories.findIndex((f) => f.id == filter.id);
        this.checkedCategories.splice(idx, 1);
        this.categoriesFiltered[selected1Indx].isChecked = this.categoriesCheckbox[selected2Indx].isChecked  = false;
      }
    }
    this.filterProduct();
  }
  onPriceChange(val: string) {
    this.productService.maxPrice = parseInt(val);
    this.productService.loadProducts();
  }
  brandSearchHandler(event: Event) {
    const result = (event.target as HTMLInputElement).value.trim();

    this.brandsFiltered = this.brandsCheckbox.filter((b) =>
      b.name.includes(result)
    );
  }
  categorySearchHandler(event: Event) {
    const result = (event.target as HTMLInputElement).value;
    this.categoriesFiltered = this.categoriesCheckbox.filter((b) =>
      b.name.includes(result)
    );
  }
  openMobileFilterMenu(event: Event) {
    const menu = (event.currentTarget as HTMLElement).querySelector('.menu');
    menu?.classList.remove('d-none');
  }
  closeMobileFilterMenu(event: Event) {
    event.stopPropagation();
    const menu = (event.currentTarget as HTMLElement)
      .closest('.filter-menu')
      ?.querySelector('.menu');
    menu?.classList.add('d-none');
  }

  formReset(formRef: HTMLFormElement) {
    this.reset();
    this.productService.loadProducts(1);
    formRef.reset();
  }
  reset() {
    this.checkedBrands.forEach((c) => (c.isChecked = false));
    this.checkedBrands = [];
    this.checkedCategories.forEach((c) => (c.isChecked = false));
    this.checkedCategories = [];
    this.productService.brandsParams = [];
    this.productService.categoriesPrams = [];
    this.productService.maxPrice = null;
    this.isCategoryHasChecked.next(false);
    this.isBrandsHasChecked.next(false);
  }

  flat(array: any) {
    let result: any = [];
    array.forEach((a: any) => {
      result.push(a);
      if (Array.isArray(a.children) && a?.children.length > 0) {
        result = result.concat(this.flat(a.children));
      }
    });
    return result;
  }

  loadCategories() {
    this.categoriesCheckbox=[];
    this.filterApiService.getAllCategories().subscribe((res) => {
      this.categories = this.flat(res);
      this.categories.forEach((category) => {
        const Checkbox: CheckboxFilter = {
          id: category.uuid,
          name: category.displayName,
          isChecked: this.productService.categoriesPrams.includes(
            category.uuid
          ),
          type: FilterType.Category,
        };
        if (Checkbox.isChecked) {
          this.checkedCategories.push(Checkbox);
          this.isCategoryHasChecked.next(true);
          this.categoriesCheckbox.unshift(Checkbox);
        } else this.categoriesCheckbox.push(Checkbox);
      });
      this.categoriesFiltered = [...this.categoriesCheckbox];
    });
  }

  loadBrands() {
    this.brandsCheckbox=[];
    this.filterApiService.getAllBrand().subscribe((b) => {
      this.brands = b;
      this.brands.forEach((brand) => {
        const Checkbox: CheckboxFilter = {
          id: brand.uuid,
          name: brand.displayName,
          isChecked: this.productService.brandsParams.includes(brand.uuid),
          type: FilterType.Brand,
        };
        if (Checkbox.isChecked) {
          this.checkedBrands.push(Checkbox);
          this.isBrandsHasChecked.next(true);
          this.brandsCheckbox.unshift(Checkbox); // to show checked brands at top
        } else this.brandsCheckbox.push(Checkbox);
      });
      this.brandsFiltered = [...this.brandsCheckbox];
    });
  }

  filterProduct() {
    //brands
    let brandsPrams: string[] = [];
    this.checkedBrands.forEach((f) => {
      brandsPrams.push(f.id);
    });
    this.productService.brandsParams = brandsPrams;

    //categories

    let categoriesPrams: string[] = [];
    this.checkedCategories.forEach((f) => {
      categoriesPrams.push(f.id);
    });

    this.productService.categoriesPrams = categoriesPrams;
    this.productService.loadProducts(1);
  }
}

