import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from "../../Shared/card/card.component";
import { OfferCardComponent } from "./offer-card/offer-card.component";
import { FilterSecComponent } from "./filter-sec/filter-sec.component";
import { MobileFilterComponent } from "./mobile-filter/mobile-filter.component";

@Component({
    selector: 'app-products-page',
    standalone: true,
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.css',
    imports: [RouterModule, CardComponent, OfferCardComponent, FilterSecComponent, MobileFilterComponent]
})
export class ProductsPageComponent {
  products:number[] = [];


  constructor() {
  this.products=Array(13).fill(0);
  }

}
