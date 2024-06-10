import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { ICreateOrder } from '../../../../../Models/Order/ICreateOrder';
import { PaymentMethod } from '../../../../../Models/Cart/PaymentMethod';

@Component({
  selector: 'app-ConfirmPayment',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './ConfirmPayment.component.html',
  styleUrls: ['./ConfirmPayment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {

  @Output() nextStep = new EventEmitter<void>();

  selectedPaymentMethod: string | null = null;

  paymentMethodEnum =PaymentMethod;
  
  constructor(  public cartService: CartService, private orderService :OrderService ) { }

  ngOnInit() {
    
  }


  next() {
    // let order:ICreateOrder={
    //   paymentMethod:PaymentMethod;
    //   shippingAddressUuid:string;
    //   items:{productStockUuid:string}[]
    //  }
    // this.orderService.createOrder(order).subscribe()
    this.nextStep.emit();
  }

  // Payment Methods
  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }

}
