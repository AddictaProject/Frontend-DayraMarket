import { Injectable, OnInit } from '@angular/core';
import { ICartItem } from '../../Models/Cart/ICartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ICartItem[] = [];
  finalTotalPrice !:number;
  subTotalPrice!: number;

  totalPrice$ :BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotalPrice();
  }

  addToCart(item: ICartItem) {
    let indexProdInCart = this.cart.findIndex((val) => val.id === item.id);

    if (indexProdInCart != -1) return;

    this.cart.push(item);

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotalPrice();
  }
  deleteFromCart(id: string) {
    let indexProdInCart = this.cart.findIndex((val) => val.id === id);
    console.log(indexProdInCart);
    if (indexProdInCart === -1) return;

    this.cart.splice(indexProdInCart, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotalPrice();
  }

  getCart(): ICartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  clearCart(){
    localStorage.setItem('cart', '');
  }

  calculateTotalPrice() {
    const totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
    this.totalPrice$.next(totalPrice);
  }
}
