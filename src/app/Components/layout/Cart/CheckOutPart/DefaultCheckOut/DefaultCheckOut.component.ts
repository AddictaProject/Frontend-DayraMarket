import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { UserService } from '../../../../../Services/UserService/user.service';

@Component({
  selector: 'app-DefaultCheckOut',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './DefaultCheckOut.component.html',
  styleUrls: ['./DefaultCheckOut.component.css']
})

export class DefaultCheckOutComponent implements OnInit {
  totalPrice!: number;

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
      this.router.navigate(['/login']);
  }
}
