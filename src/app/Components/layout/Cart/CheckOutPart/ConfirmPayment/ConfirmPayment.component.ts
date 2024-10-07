import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { ICreateOrder, productStockUuid } from '../../../../../Models/Order/ICreateOrder';
import { PaymentMethod } from '../../../../../Models/Cart/PaymentMethod';
import { IOrder } from '../../../../../Models/Order/IOrder';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ConfirmPayment',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './ConfirmPayment.component.html',
  styleUrls: ['./ConfirmPayment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {

  @Output() nextStep = new EventEmitter<void>();

  confirmOrder!:IOrder;

  selectedPaymentMethod!: PaymentMethod ;

  paymentMethodEnum =PaymentMethod;

  isOrdered=true;

  constructor(  public cartService: CartService, private orderService :OrderService,private router:Router ) { }

  ngOnInit() {

  }

  next() {
    this.isOrdered=false;
    const productStockUuids:productStockUuid[]= this.cartService.getCart().map(p=>{return{productStockUuid:p.id}});
    let order:ICreateOrder={
      paymentMethod:this.selectedPaymentMethod,
      shippingAddressUuid:this.orderService.userAddress.uuid ??'',
      items:productStockUuids
    }
    this.orderService.createOrder(order).subscribe({
      next: (res:any) => {
        this.orderService.confirmOrder=res;
        localStorage.setItem('orderPlaced','true');
        this.cartService.clearCart();
        if(res.paymentMethod==="COD")
          this.router.navigate(["order-placed"]);
        else
          window.location.href=res.redirect_Url;
        this.isOrdered=true;
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }
  // Payment Methods
  onPaymentMethodChange(method:PaymentMethod ) {
    this.selectedPaymentMethod = method;
  }

}
