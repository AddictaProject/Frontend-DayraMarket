import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {

  constructor() { }

  loginWithFacebook(): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      FB.login((response: any) => {
        if (response.authResponse) {
          // @ts-ignore
          FB.api('/me', { fields: 'name, email' }, (userInfo: any) => {
            resolve({ userInfo, authResponse: response.authResponse });
          });
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'public_profile,email' });
    });
  }
}
