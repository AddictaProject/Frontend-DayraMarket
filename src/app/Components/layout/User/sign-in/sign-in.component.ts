import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../Services/UserService/user.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ILogin } from '../../../../Models/User/ILogin';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationService } from '../../../../Services/NavigationService/navigation.service';
import { IExternalLogin } from '../../../../Models/User/IExternalLogin';
import { IExternalSignUp } from '../../../../Models/User/IExternalSignUp';
import { ExternalSignUpComponent } from '../external-sign-up/external-sign-up.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, ExternalSignUpComponent,TranslateModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  previousUrl: string = '';
  externalData!: IExternalSignUp;
  serverError: boolean = false;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private navigation: NavigationService
  ) {
    if (userService.userState) {
      this.router.navigate([this.navigation.returnPerviousUrl()]);
      return;
    }
  }
  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id:
        '332205403560-d3oanc4nkkussj9ffcpl1motsg665jna.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this, 'Google'),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById('google-button'), {
      theme: 'outline',
      size: 'large',
    });
    // @ts-ignore
    google.accounts.id.prompt();
    this.wfbAsyncInit();
  }
  public triggerGoogleLogin() {
    (document.querySelector('div[role=button]') as HTMLElement).click();
  }
  async handleCredentialResponse(provider: any, response: any) {
    const externalLogin: IExternalLogin={
      provider: provider,
      externalToken: '',
    }

    // Here will be your response from Google.
    if (provider=='Google') {
      externalLogin.externalToken= response.credential;
    }
    else if(provider=='Facebook') {
      externalLogin.externalToken= response;
    }

    this.userService.externalLogin(externalLogin).subscribe((res: any) => {
      if (res.accessToken) {
        this.serverError = false;
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate([this.navigation.returnPerviousUrl()]);
      }
      this.externalData = res;
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      for (const key in this.signInForm.controls) {
        this.signInForm.get(key)?.markAsDirty();
        this.signInForm.get(key)?.markAsTouched();
      }
      return;
    }
    let user: ILogin = {
      email: this.signInForm.get('email')?.value ?? '',
      password: this.signInForm.get('password')?.value ?? '',
    };
    this.userService.login(user).subscribe({
      next: (res: any) => {
        this.serverError = false;
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate([this.navigation.returnPerviousUrl()]);
      },
      error: (err) => {
        this.serverError = true;
      },
    });
  }

  loginWithFaceBook() {
    // @ts-ignore
    FB.login(
      (response:any) => {
        console.log(response);
        this.handleCredentialResponse('Facebook',response.authResponse.accessToken);
      },
      { scope: 'public_profile,email'}
    );
  }

  wfbAsyncInit() {
    // @ts-ignore
    FB.fbAsyncInit = () => {
      // @ts-ignore
      FB.init({
        appId: '548307494399719',
        cookie: true,
        xfbml: true,
        version: 'v5.0',
      });
      // @ts-ignore
      FB.AppEvents.logPageView();
    };
  }
}
