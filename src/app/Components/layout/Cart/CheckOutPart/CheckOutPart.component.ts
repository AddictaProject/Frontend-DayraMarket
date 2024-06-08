import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { RouterModule } from '@angular/router';
import { DefaultCheckOutComponent } from "./DefaultCheckOut/DefaultCheckOut.component";
import { AddressAddingComponent } from "./Address-Adding/Address-Adding.component";
import { ReviewOrderComponent } from "./Review-Order/Review-Order.component";
import { ConfirmPaymentComponent } from "./ConfirmPayment/ConfirmPayment.component";
import { CartCasesEnum } from '../../../../Models/Cart/models/cart-cases-enum';

@Component({
    selector: 'app-CheckOutPart',
    standalone: true,
    templateUrl: './CheckOutPart.component.html',
    styleUrls: ['./CheckOutPart.component.css'],
    imports: [RouterModule, DefaultCheckOutComponent, AddressAddingComponent, ReviewOrderComponent, ConfirmPaymentComponent]
})
export class CheckOutPartComponent implements OnInit {
  constructor(public _ProductDetailsService: ProductDetailsService) {}

  ngOnInit() {}
  
  isLogin :boolean=false;

  CartCasesEnum = CartCasesEnum;
  CurrentCase :CartCasesEnum = CartCasesEnum.Default;
  goToNextCase() {
    if (this.CurrentCase < CartCasesEnum.Confirm) {
      this.CurrentCase++;
    }
  }

}
