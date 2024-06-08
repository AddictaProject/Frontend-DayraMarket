import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';
import { ISignUp } from '../../Models/User/ISignUp';
import { ILogin } from '../../Models/User/ilogin';
import { IVerifyPhoneNumber } from '../../Models/User/IVerifyPhoneNumber';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL!: string;
  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/';
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
}
