import { Injectable } from '@angular/core';
import { ICartItem } from '../../Models/Cart/ICartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: ICartItem[] = [];
  constructor() {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
   }

  addToCart(item:ICartItem) {
    let indexProdInCart = this.cart.findIndex((val) => val.id === item.id);

    if (indexProdInCart != -1)
      return

    this.cart.push(item);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  deleteFromCart(id:string) {
    let indexProdInCart = this.cart.findIndex((val) => val.id === id);
    console.log(indexProdInCart);
    if (indexProdInCart === -1)
      return

    this.cart.splice(indexProdInCart,1)
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart():ICartItem[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
