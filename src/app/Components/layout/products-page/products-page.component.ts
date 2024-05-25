import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from "../../Shared/card/card.component";
import { OfferCardComponent } from "./offer-card/offer-card.component";

@Component({
    selector: 'app-products-page',
    standalone: true,
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.css',
    imports: [RouterModule, CardComponent, OfferCardComponent]
})
export class ProductsPageComponent {
  products:number[] = [];

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
}
