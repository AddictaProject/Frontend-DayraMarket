import { Component, OnInit } from '@angular/core';
import { CheckOutPartComponent } from "./CheckOutPart/CheckOutPart.component";
import { PairsWellCartComponent } from "./PairsWellCart/PairsWellCart.component";
import { PairsWellComponent } from "../product-details/pairs-well/pairs-well.component";
import { MightLikeComponent } from "../product-details/might-like/might-like.component";

@Component({
    selector: 'app-Cart',
    standalone: true,
    templateUrl: './Cart.component.html',
    styleUrls: ['./Cart.component.css'],
    imports: [CheckOutPartComponent, PairsWellCartComponent, PairsWellComponent, MightLikeComponent]
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
