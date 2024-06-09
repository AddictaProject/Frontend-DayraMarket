import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../../../Services/CartService/cart.service';

@Component({
  selector: 'app-DefaultCheckOut',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './DefaultCheckOut.component.html',
  styleUrls: ['./DefaultCheckOut.component.css']
})

export class DefaultCheckOutComponent implements OnInit {
  totalPrice!: number;
  
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cartService.totalPrice$.subscribe(totalprice => {
      this.totalPrice =totalprice;
    })

  }

  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }
}
