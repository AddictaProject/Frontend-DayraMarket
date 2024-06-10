import { Component } from '@angular/core';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { OrderService } from '../../../../Services/OrderService/order.service';
import { IOrder } from '../../../../Models/Order/IOrder';
import { IProductOrderItem } from '../../../../Models/Order/IProductOrderItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  orders:IOrder[]=[];
  totalPrice:number=0;
  // productOrderItem !:IProductOrderItem;

  constructor(public _productDetailsService: ProductDetailsService,private orderService:OrderService) {}

  ngOnInit() {
    this.orderService.getUserOrder().subscribe({
      next: (res:any) => {
        this.orders=res;
        console.log(this.orders);

      },
      error: (err:any) => {
        console.log(err);
      }
    });

  }


}
