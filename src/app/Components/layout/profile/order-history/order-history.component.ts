import { Component } from '@angular/core';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { OrderService } from '../../../../Services/OrderService/order.service';
import { IOrder } from '../../../../Models/Order/IOrder';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  order:IOrder[]=[];
  totalPrice:number=0;

  constructor(public _productDetailsService: ProductDetailsService,private orderService:OrderService) {}

  ngOnInit() {

  }


}
