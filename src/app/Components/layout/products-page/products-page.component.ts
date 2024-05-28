import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from "../../Shared/card/card.component";
import { OfferCardComponent } from "./offer-card/offer-card.component";
import { CheckboxFilter, FilterComponent } from "./filter/filter.component";
import { filter } from 'rxjs';

@Component({
    selector: 'app-products-page',
    standalone: true,
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.css',
    imports: [RouterModule, CardComponent, OfferCardComponent, FilterComponent]
})
export class ProductsPageComponent {
  products:number[] = [];
  categories:CheckboxFilter[]=[
    {id:'cat-1', name:'mobile',isChecked:false},
    {id:'cat-2', name:'laptop',isChecked:false},
    {id:'cat-3', name:'headphones',isChecked:false},
    {id:'cat-4', name:'tvs',isChecked:false},
    {id:'cat-5', name:'bag',isChecked:false},
    {id:'cat-6', name:'games',isChecked:false},
    {id:'cat-7', name:'access',isChecked:false},
  ]
  brands:CheckboxFilter[]=[
    {id:'br-1', name:'apple',isChecked:false},
    {id:'br-2', name:'samsung',isChecked:false},
    {id:'br-3', name:'xiaomi',isChecked:false},
    {id:'br-4', name:'lenovo',isChecked:false},
    {id:'br-5', name:'honor',isChecked:false},
    {id:'br-6', name:'oppo',isChecked:false},
    {id:'br-7', name:'huawei',isChecked:false},
  ]
  checked:CheckboxFilter[]=[];
  brandsFiltered:CheckboxFilter[]=[...this.brands];
  categoriesFiltered:CheckboxFilter[]=[...this.categories];

  constructor() {
  this.products=Array(13).fill(0);
  }
  openFilterMenu(event:Event){
    (event.target as HTMLElement).classList.toggle('fa-plus');
    (event.target as HTMLElement).classList.toggle('fa-minus');
    const filterMenu=(event.target as HTMLElement).closest('.filter-menu');
    filterMenu?.classList.toggle('active');
    filterMenu?.querySelector('.menu')?.classList.toggle('d-none');
  }

  getChecked(filter: CheckboxFilter){
    filter.isChecked=!filter.isChecked;
    if (filter.isChecked)
      this.checked.push(filter);
    else
    {
      const idx=this.checked.findIndex(f=>f.id==filter.id);
      this.checked.splice(idx, 1);
    }

    console.log(this.checked);
  }

  brandSearchHandler(event: Event){
    const result=(event.target as HTMLInputElement).value.trim();
    console.log(result);
    this.brandsFiltered=this.brands.filter(b=>b.name.includes(result));
    console.log(this.brandsFiltered);
  }
  categorySearchHandler(event: Event){
    const result=(event.target as HTMLInputElement).value;
    console.log(result);
    this.categoriesFiltered=this.categories.filter(b=>b.name.includes(result));
    console.log(this.categoriesFiltered);
  }
}
