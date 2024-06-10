import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { IShipping } from '../../../../../Models/User/IShipping';
import { SettingService } from '../../../../../Services/SettingService/setting.service';

@Component({
  selector: 'app-SuccessCart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './SuccessCart.component.html',
  styleUrls: ['./SuccessCart.component.css'],
})
export class SuccessCartComponent implements OnInit ,OnDestroy {
  userAddress!: IUserAddress;
  // shippingInfo!: IShipping;
  // subTotalPrice!: number;

  @Output() nextStep = new EventEmitter<void>();

  constructor(
    public orderService: OrderService,
    public cartService: CartService,
    public settingService: SettingService
  ) {}

  ngOnInit() {
    this.userAddress = this.orderService.userAddress;
  }
  ngOnDestroy(): void {
    this.cartService.clearCart();
  }

}
