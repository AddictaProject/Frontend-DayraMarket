import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { UserService } from '../../../../../Services/UserService/user.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-DefaultCheckOut',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './DefaultCheckOut.component.html',
  styleUrls: ['./DefaultCheckOut.component.css']
})

export class DefaultCheckOutComponent implements OnInit {
  totalPrice!: number;
  PromoCode: boolean = false;

  constructor(private cartService:CartService,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.cartService.totalPrice$.subscribe(totalprice => {
      this.totalPrice =totalprice;
    })

  }

  @Output() nextStep = new EventEmitter<void>();

  next() {
    if(this.userService.userState)
      this.nextStep.emit();
    else
      this.router.navigate(['/no-account']);
  }
}
