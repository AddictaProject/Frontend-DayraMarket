import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

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
 
  constructor() { }

  ngOnInit() {
  }


  // Not Yet
  next() {
  }

  // Payment Methods
  onPaymentMethodChange(method: string) {
    this.selectedPaymentMethod = method;
  }

}
