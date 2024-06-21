import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';
import { ICreateOrder } from '../../Models/Order/ICreateOrder';
import { IUserAddress } from '../../Models/Cart/IUserAddress';
import { IOrder } from '../../Models/Order/IOrder';
import { IReview } from '../../Models/Order/ireview';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL!: string;
  userAddress!: IUserAddress;

  confirmOrder!:IOrder;

  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/';
  }
  createOrder(order: ICreateOrder){
    return this.httpClient.post(this.URL+'orders', order);
  }
  getUserOrder(){
    return this.httpClient.get(this.URL+'orders/my');
  }

  reviewOrderItem(itemId:string,review:IReview){
    return this.httpClient.post(this.URL+`orders/items/${itemId}/review`, review);
  }
  cancelOrderItem(itemId:string){
    return this.httpClient.put(this.URL+`orders/items/${itemId}/cancel`,'');
  }
  returnOrderItem(itemId:string){
    return this.httpClient.put(this.URL+`orders/items/${itemId}/return`,'');
  }


}
