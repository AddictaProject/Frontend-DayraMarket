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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IReview } from '../../../../Models/Order/IReview';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { Environment } from '../../../../../enviroment/environment';
import { PaymentMethod } from '../../../../Models/Cart/PaymentMethod';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CommonModule,
    StarHoverDirective,
    ReactiveFormsModule,
    SweetAlert2Module,
    TranslateModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  orders: IOrder[] = [];
  totalPrice: number = 0;
  isReviewVisible = false;
  isPaymentFailed = false;
  isPaymentMethodVisible = false;
  reviewItem: IOrderItem | null = null;
  rate: number = 0;
  form: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  // productOrderItem !:IProductOrderItem;
  url = Environment.serverURL;

  selectedPaymentMethod: PaymentMethod = PaymentMethod.CreditCard;

  paymentMethodEnum = PaymentMethod;

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
    this.isReviewVisible = !this.isReviewVisible;
  }

  openPaymentRequest(item: IOrderItem) {
    this.reviewItem = item;
    this.isPaymentMethodVisible = !this.isPaymentMethodVisible;
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
  onSubmit() {
    if (!this.reviewItem) return;

    let review: IReview = {
      rate: this.rate,
      comment: this.form.get('comment')?.value ?? '',
    };
    this.orderService.reviewOrderItem(this.reviewItem.uuid, review).subscribe({
      next: (res: any) => {
        console.log(res);
        this.rate = 0;
        this.form.reset();
        this.reviewItem = null;
        this.isReviewVisible = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  cancelOrderItem(e: Event, id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger px-4',
        cancelButton:
          'btn border border-1 border-danger text-danger  ms-2 px-4',
      },
    }).then((result) => {
      if (result.value) {
        this.orderService.cancelOrderItem(id).subscribe({
          next: (res: any) => {
            let elem = e.target as HTMLElement;
            elem.classList.add('d-none');
            elem.closest('div')!.querySelector('.status')!.textContent =
              'Cancelled';
            Swal.fire({
              title: 'Canceled!',
              text: 'Your order has been canceled.',
              icon: 'success',
              buttonsStyling:true,
              confirmButtonColor:"#09764CCC",
            });
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              buttonsStyling: true,
              iconColor: '#09764CCC',
            });
          },
        });
      }
    });
  }

  returnOrderItem(e: Event, id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Yes, return it!',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger px-4',
        cancelButton:
          'btn border border-1 border-danger text-danger  ms-2 px-4',
      },
    }).then((result) => {
      if (result.value) {
        this.orderService.returnOrderItem(id).subscribe({
          next: (res: any) => {
            let elem = e.target as HTMLElement;
            elem.classList.add('d-none');
            elem.closest('div')!.querySelector('.status')!.textContent =
              'ReturnRequested';
            Swal.fire({
              title: 'ReturnRequested!',
              text: 'Your order has been requested to return.',
              icon: 'success',
            });
          },
          error: (err: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              buttonsStyling: true,
              iconColor: '#09764CCC',
            });
          },
        });
      }
    });
  }
  onPaymentMethodChange(method: PaymentMethod) {
    this.selectedPaymentMethod = method;
  }
  paymentRequest() {
    this.isPaymentFailed=false;
    this.orderService
      .paymentRequest(
        this.reviewItem?.orderUuid ?? '',
        this.selectedPaymentMethod.toString()
      )
      .subscribe(
        (res: any) => {
          localStorage.setItem('orderPlaced', 'true');
          window.location.href = res.redirect_Url;
        },
        (err: any) => {
          this.isPaymentFailed = true;
        }
      );
  }
}
