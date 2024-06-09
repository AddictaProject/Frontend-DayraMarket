import { Component, OnInit, input } from '@angular/core';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { RouterModule } from '@angular/router';
import { DefaultCheckOutComponent } from "./DefaultCheckOut/DefaultCheckOut.component";
import { AddressAddingComponent } from "./Address-Adding/Address-Adding.component";
import { ReviewOrderComponent } from "./Review-Order/Review-Order.component";
import { ConfirmPaymentComponent } from "./ConfirmPayment/ConfirmPayment.component";
import { CartCasesEnum } from '../../../../Models/Cart/models/cart-cases-enum';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-CheckOutPart',
    standalone: true,
    templateUrl: './CheckOutPart.component.html',
    styleUrls: ['./CheckOutPart.component.css'],
    imports: [RouterModule, DefaultCheckOutComponent, AddressAddingComponent, ReviewOrderComponent, ConfirmPaymentComponent,CommonModule]
})
export class CheckOutPartComponent implements OnInit {
  cart:ICartItem[]=[];
  totalPrice:number=0;

  constructor(public _ProductDetailsService: ProductDetailsService,private cartService:CartService) {}

  ngOnInit() {
    this.cart=this.cartService.getCart();
  }



  CartCasesEnum = CartCasesEnum;
  CurrentCase :CartCasesEnum = CartCasesEnum.Default;
  goToNextCase() {
    if (this.CurrentCase < CartCasesEnum.Confirm) {
      this.CurrentCase++;
    }
  }

  removeItem(id:string){
    this.cartService.deleteFromCart(id);
    this.cart=this.cartService.getCart();
  }
}
