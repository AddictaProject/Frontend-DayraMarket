import { Component } from '@angular/core';
import { ICartItem } from '../../../../Models/Cart/ICartItem';
import { CartService } from '../../../../Services/CartService/cart.service';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { OrderService } from '../../../../Services/OrderService/order.service';
import { IOrder } from '../../../../Models/Order/IOrder';
import { IProductOrderItem } from '../../../../Models/Order/IProductOrderItem';
import { CommonModule } from '@angular/common';
import { IOrderItem } from '../../../../Models/Order/IOrderItem';
import { StarHoverDirective } from '../../../../Directives/star-hover.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IReview } from '../../../../Models/Order/ireview';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, StarHoverDirective,ReactiveFormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  orders: IOrder[] = [];
  totalPrice: number = 0;
  reviewVisible = false;
  reviewItem: IOrderItem|null = null;
  rate: number = 0;
  form:FormGroup=new FormGroup({
    comment:new FormControl('',[Validators.required]),
  })
  // productOrderItem !:IProductOrderItem;

  constructor(
    public _productDetailsService: ProductDetailsService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService.getUserOrder().subscribe({
      next: (res: any) => {
        this.orders = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openReview(item: IOrderItem) {
    this.reviewItem = item;
    this.reviewVisible = !this.reviewVisible;
  }

  onClick(event: Event, rateValue: number) {
    let currentElem = event.srcElement as HTMLElement;
    const allElem = Array.from(currentElem.parentElement?.children ?? []);
    if (currentElem.classList.contains('fixed')) {
      for (const elem of allElem) elem.classList.remove('fixed');
      this.rate = 0;
    } else {
      for (const elem of allElem) {
        elem.classList.add('fixed');
        if (currentElem == elem) {
          break;
        }
      }
      this.rate = rateValue;
    }
  }
  onSubmit(){
    if (!this.reviewItem)
      return

    let review:IReview={
      rate:this.rate,
      comment:this.form.get('comment')?.value??'',
    }
    this.orderService.reviewOrderItem(this.reviewItem.uuid,review).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.rate=0;
        this.form.reset();
        this.reviewItem=null;
        this.reviewVisible=false;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  cancelOrderItem(id:string) {
    this.orderService.cancelOrderItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  returnOrderItem(id:string) {
    this.orderService.returnOrderItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
