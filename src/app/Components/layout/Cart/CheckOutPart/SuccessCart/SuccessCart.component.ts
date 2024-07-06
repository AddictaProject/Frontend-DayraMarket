import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { IShipping } from '../../../../../Models/User/IShipping';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { UserService } from '../../../../../Services/UserService/user.service';
import { IOrder } from '../../../../../Models/Order/IOrder';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-SuccessCart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './SuccessCart.component.html',
  styleUrls: ['./SuccessCart.component.css'],
})
export class SuccessCartComponent implements OnInit ,OnDestroy {
  userAddress!: IUserAddress;
  isPriceFreeShipping :boolean=false;
  order!: IOrder ;
  subTotalPrice:number=0;
  shippingCost=0;
  constructor(
    public orderService: OrderService,
    public cartService: CartService,
    public settingService: SettingService,
    public userService: UserService
  ) {}

  ngOnInit() {
    Swal.fire({
      title: 'Congratulations!',
      text: 'Your order has been placed.',
      icon: 'success',
      buttonsStyling:true,
      confirmButtonColor:"#09764CCC",
      iconColor:"#09764CCC",
      })
    localStorage.removeItem('orderPlaced');

    this.userAddress = this.orderService.userAddress;
    localStorage.removeItem('orderPlaced');
    this.orderService.getUserOrder().subscribe({
      next: (res: any) => {
        this.order = res[0];
        this.userService.getUserAddressById(this.order.shippingAddressUuid).subscribe((address:any)=>{
          this.userAddress=address;
          console.log(this.order);
          console.log(new Date( Date.parse(this.order.dateCreated)) ,new Date( Date.now() ));
        })
        this.order.items.forEach(item=>{
          this.subTotalPrice+=item.price;
        })
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.settingService.getShippingAddress().subscribe(
      (data: any) =>{
        this.shippingCost = data.shippingCost
        this.subTotalPrice+=this.shippingCost;
      }
    );

  }
  ngOnDestroy(): void {
  }
}
