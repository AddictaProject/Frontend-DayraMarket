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
  userAddress!: IUserAddress;

  constructor(
    public orderService: OrderService,
    public settingService: SettingService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.userAddress = this.orderService.userAddress;

    this.settingService.getShippingAddress().subscribe({
      next: (data: any) => {
        this.settingService.shippingInfo = data;

        this.cartService.totalPrice$.subscribe((t) => {
          this.cartService.subTotalPrice = t;
          this.updateTotalPrice();
        });
      },
      error: (error: any) => {
        console.error('Error fetching shipping address:', error);
      },
    });

  }

  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }

   updateTotalPrice() {
    if (this.cartService.subTotalPrice >= this.settingService.shippingInfo.freeShippingAfter) {
      this.cartService.finalTotalPrice=this.cartService.subTotalPrice;
    } else {
      this.cartService.finalTotalPrice= this.cartService.subTotalPrice + this.settingService.shippingInfo.shippingCost;
    }
  }


}
