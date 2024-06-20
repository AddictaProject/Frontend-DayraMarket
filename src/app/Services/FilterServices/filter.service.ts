import { ElementRef, Injectable, OnInit } from '@angular/core';

import { FilterApiService } from './filter-api.service';
import { IBrand } from '../../Models/Brand/IBrand';
import { ICategory } from '../../Models/Category/ICategory';
import { ProductService } from '../ProductService/product.service';
import { IProductParams } from '../../Models/Product/All-Products/IProductParams';
import { CheckboxFilter } from '../../Models/Product/All-Products/CheckboxFilter';
import { ProductApiService } from '../ProductService/product-api.service';
import { FilterType } from '../../Models/Product/All-Products/FilterType';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  brands: IBrand[] = [];
  categories: ICategory[] = [];

  categoriesCheckbox: CheckboxFilter[] = []; //for Search All Categories
  brandsCheckbox: CheckboxFilter[] = [];
  checkedBrands: CheckboxFilter[] = [];
  checkedCategories: CheckboxFilter[] = [];
  brandsFiltered: CheckboxFilter[] = [];
  categoriesFiltered: CheckboxFilter[] = [];

  constructor(
    private filterApiService: FilterApiService,
    public productService: ProductService
  ) {
    this.loadCategories();
    this.loadBrands();
  }

  openFilterMenu(event: Event) {
    (event.target as HTMLElement).classList.toggle('fa-plus');
    (event.target as HTMLElement).classList.toggle('fa-minus');
    const filterMenu = (event.target as HTMLElement).closest('.filter-menu');
    filterMenu?.classList.toggle('active');
    filterMenu?.querySelector('.menu')?.classList.toggle('d-none');
  }

  getChecked(filter: CheckboxFilter) {
    filter.isChecked = !filter.isChecked;
    if (filter.type === FilterType.Brand) {
      let selected1=this.brandsFiltered.find(b=>b.id === filter.id) ?? filter;
      let selected2=this.brandsCheckbox.find(b=>b.id === filter.id) ?? filter;
      if (filter.isChecked)
        {
          this.checkedBrands.push(filter);
          selected1.isChecked=selected2.isChecked=true;
        }
      else {
        const idx = this.checkedBrands.findIndex((f) => f.id == filter.id);
        this.checkedBrands.splice(idx, 1);
        selected1.isChecked=selected2.isChecked=false;
      }
    }
    else if(filter.type === FilterType.Category){
      let selected1=this.categoriesFiltered.find(b=>b.id === filter.id) ?? filter;
      let selected2=this.categoriesCheckbox.find(b=>b.id === filter.id) ?? filter;

      if (filter.isChecked){
        this.checkedCategories.push(filter);
        selected1.isChecked=selected2.isChecked=true;
      }
      else {
        const idx = this.checkedCategories.findIndex((f) => f.id == filter.id);
        this.checkedCategories.splice(idx, 1);
        selected1.isChecked=selected2.isChecked=false;
      }
    }
    this.filterProduct();
  }

  onPriceChange(val:string){
    this.productService.maxPrice=parseInt(val);
    this.productService.loadProducts(1)
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

  reset(formRef: HTMLFormElement) {
    this.checkedBrands.forEach((c) => (c.isChecked = false));
    this.checkedBrands = [];
    this.checkedCategories.forEach((c) => (c.isChecked = false));
    this.checkedCategories = [];
    this.productService.brandsParams=[];
    this.productService.categoriesPrams=[];
    this.productService.maxPrice=null;
    this.productService.loadProducts(1)
    formRef.reset();
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
    this.filterApiService.getAllCategories().subscribe((res) => {
      this.categories = this.flat(res);
      this.categories.forEach((category) => {
        const Checkbox: CheckboxFilter = {
          id: category.uuid,
          name: category.displayName,
          isChecked: this.productService.categoriesPrams.includes(category.uuid),
          type: FilterType.Category,
        };
        this.categoriesCheckbox.push(Checkbox);
      });
      this.categoriesFiltered = [...this.categoriesCheckbox];
    });
  }

  loadBrands() {
    this.filterApiService.getAllBrand().subscribe((b) => {
      this.brands = b;
      this.brands.forEach((brand) => {
        const Checkbox: CheckboxFilter = {
          id: brand.uuid,
          name: brand.displayName,
          isChecked: this.productService.brandsParams.includes(brand.uuid),
          type: FilterType.Brand,
        };
        this.brandsCheckbox.push(Checkbox);
      });
      this.brandsFiltered = [...this.brandsCheckbox];
    });
  }

  filterProduct() {
    //brands
    let brandsPrams: string[] = [];
    this.checkedBrands.forEach(f=>{
      brandsPrams.push(f.id);
    })
    this.productService.brandsParams=brandsPrams;

    //categories

    let categoriesPrams: string[] = [];
    this.checkedCategories.forEach(f=>{
      categoriesPrams.push(f.id);
    })

    this.productService.categoriesPrams=categoriesPrams;
    this.productService.loadProducts(1)
  }



}
