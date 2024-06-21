import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IUserAddress } from '../../../../../../Models/Cart/IUserAddress';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../../../Services/CartService/cart.service';
import { OrderService } from '../../../../../../Services/OrderService/order.service';
import { AddressSteps } from '../../../../../../Models/Cart/AddressStep';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-default-address',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './default-address.component.html',
  styleUrl: './default-address.component.css',
})
export class DefaultAddressComponent implements OnInit, OnDestroy {
  @Output() addressStep = new EventEmitter();
  addressSteps=AddressSteps;
  @Input() isLoading!:boolean ;

  totalPrice!: number;
  sub!: Subscription;
  constructor(private _cartService: CartService,public _orderService:OrderService) {}

  ngOnInit() {
    this.sub = this._cartService.totalPrice$.subscribe((p) => {
      this.totalPrice = p;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
