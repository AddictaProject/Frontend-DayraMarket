import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private URL!: string;
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
