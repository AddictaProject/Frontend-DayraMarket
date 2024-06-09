import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { IShipping } from '../../../../../Models/User/IShipping';
import { CartService } from '../../../../../Services/CartService/cart.service';

@Component({
  selector: 'app-Review-Order',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Review-Order.component.html',
  styleUrls: ['./Review-Order.component.css'],
})
export class ReviewOrderComponent implements OnInit {

  userAddress!:IUserAddress;
  shippingInfo !:IShipping;
  subTotalPrice !:number;
  totalPrice: number =0;

  constructor(public orderService: OrderService , private settingService: SettingService,
    private cartService :CartService
  ) {}

  ngOnInit() {

    this.userAddress=this.orderService.userAddress;

    this.settingService.getShippingAddress().subscribe({
      next: (data: any) => {
        this.shippingInfo = data;
      },
      error: (error: any) => {
        console.error('Error fetching shipping address:', error);
      }
    });


    this.cartService.totalPrice$.subscribe(totalprice => {
      this.subTotalPrice= totalprice;
    })

    if(this.subTotalPrice >= this.shippingInfo.freeShippingAfter ){
      this.totalPrice = this.subTotalPrice - this.shippingInfo.shippingCost ;
    }else{
      this.totalPrice = this.subTotalPrice + this.shippingInfo.shippingCost ; 
    }
    console.log(this.totalPrice);
    
  }

  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }
}
