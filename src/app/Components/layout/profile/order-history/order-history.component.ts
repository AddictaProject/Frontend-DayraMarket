import { Component } from '@angular/core';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  cart:ICartItem[]=[];
  totalPrice:number=0;

  constructor(public _ProductDetailsService: ProductDetailsService,private cartService:CartService) {}

  ngOnInit() {
    this.cart=this.cartService.getCart();
  }
  

}
