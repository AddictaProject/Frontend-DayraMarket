import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { ICreateOrder, productStockUuid } from '../../../../../Models/Order/ICreateOrder';
import { PaymentMethod } from '../../../../../Models/Cart/PaymentMethod';
import { IOrder } from '../../../../../Models/Order/IOrder';

@Component({
  selector: 'app-ConfirmPayment',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ConfirmPayment.component.html',
  styleUrls: ['./ConfirmPayment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {

  @Output() nextStep = new EventEmitter<void>();

  confirmOrder!:IOrder;

  selectedPaymentMethod!: PaymentMethod ;

  paymentMethodEnum =PaymentMethod;

  isOrdered=true;

  constructor(  public cartService: CartService, private orderService :OrderService ) { }

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
        this.cartService.clearCart();
        this.nextStep.emit();
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
