import { Component, OnInit, input } from '@angular/core';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { RouterModule } from '@angular/router';
import { DefaultCheckOutComponent } from "./DefaultCheckOut/DefaultCheckOut.component";
import { ReviewOrderComponent } from "./Review-Order/Review-Order.component";
import { ConfirmPaymentComponent } from "./ConfirmPayment/ConfirmPayment.component";
import { CartCasesEnum } from '../../../../Models/Cart/models/cart-cases-enum';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { CommonModule } from '@angular/common';
import { SuccessCartComponent } from "./SuccessCart/SuccessCart.component";
import { EmptyCartComponent } from "../empty-cart/empty-cart.component";
import { AddressComponent } from "./Address/address.component";

@Component({
    selector: 'app-CheckOutPart',
    standalone: true,
    templateUrl: './CheckOutPart.component.html',
    styleUrls: ['./CheckOutPart.component.css'],
    imports: [RouterModule, DefaultCheckOutComponent,
        ReviewOrderComponent, ConfirmPaymentComponent, CommonModule, SuccessCartComponent, EmptyCartComponent, AddressComponent]
})
export class CheckOutPartComponent implements OnInit {
  cart:ICartItem[]=[];
  totalPrice:number=0;

  constructor(public _ProductDetailsService: ProductDetailsService,private cartService:CartService) {}

  ngOnInit() {
    this.cart=[...this.cartService.getCart()];
  }

  CartCasesEnum = CartCasesEnum;
  CurrentCase :CartCasesEnum = CartCasesEnum.Default;
  goToNextCase() {
    if (this.CurrentCase < CartCasesEnum.Success) {
      this.CurrentCase++;
    }
  }

  removeItem(id:string){
    this.cartService.deleteFromCart(id);
    this.cart=this.cartService.getCart();
  }
}
