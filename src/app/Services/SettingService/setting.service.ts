import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';
import { IShipping } from '../../Models/User/IShipping';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private URL!: string;
  shippingInfo!: IShipping;

  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/';
  }
  getAllCity(){
    return this.httpClient.get(this.URL + 'values/cities');
  }
  getAllCityDistricts(id:string){
    return this.httpClient.get(this.URL + `values/cities/${id}/districts`);
  }
  getShippingAddress(){
    return this.httpClient.get(this.URL + `settings`);
  }
}
