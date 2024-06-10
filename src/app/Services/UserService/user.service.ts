import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';
import { ISignUp } from '../../Models/User/ISignUp';
import { IVerifyPhoneNumber } from '../../Models/User/IVerifyPhoneNumber';
import { IUserAddress } from '../../Models/Cart/IUserAddress';
import { ILogin } from '../../Models/User/ilogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL!: string;
  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/';
  }
  get userState(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }

  registerUser(model:ISignUp){
    return this.httpClient.post(this.URL+'users', model);
  }
  login(model:ILogin){
    return this.httpClient.post(this.URL+'auth/authenticate', model);
  }
  verifyPhoneNumber(model:IVerifyPhoneNumber){
    return this.httpClient.post(this.URL+'users/validate-otp', model);
  }
  getUserData(){
    return this.httpClient.get(this.URL+'users/my');
  }
  addUserAddress(model:IUserAddress){
    return this.httpClient.post(this.URL+'users/my/addresses', model);
  }
  getUserAddress(){
    return this.httpClient.get(this.URL+'users/my/addresses');
  }
  updateUserAddress(model:IUserAddress){
    return this.httpClient.put(this.URL+'users/my/addresses/'+model?.uuid, model);
  }
  deleteUserAddress(id:string){
    return this.httpClient.delete(this.URL+'users/my/addresses/'+id);
  }

}
