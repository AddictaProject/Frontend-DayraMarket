import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';
import { ICreateOrder } from '../../Models/Order/ICreateOrder';
import { IUserAddress } from '../../Models/Cart/IUserAddress';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL!: string;
  userAddress!: IUserAddress;
  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/';
  }
  createOrder(order: ICreateOrder){
    return this.httpClient.post(this.URL+'orders', order);
  }
  getUserOrder(){
    return this.httpClient.get(this.URL+'orders/my');
  }
}
