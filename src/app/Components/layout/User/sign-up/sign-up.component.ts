import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NumberOnlyDirective } from '../../../../Directives/number-only.directive';
import { CommonModule } from '@angular/common';
import { ISignUp } from '../../../../Models/User/ISignUp';
import { UserService } from '../../../../Services/UserService/user.service';
import { VerifyComponent } from '../verify/verify.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IExternalSignUp } from '../../../../Models/User/IExternalSignUp';
import { IExternalLogin } from '../../../../Models/User/IExternalLogin';
import { NavigationService } from '../../../../Services/NavigationService/navigation.service';
import { ExternalSignUpComponent } from "../external-sign-up/external-sign-up.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  imports: [
    ReactiveFormsModule,
    NumberOnlyDirective,
    CommonModule,
    VerifyComponent,
    RouterModule,
    ExternalSignUpComponent
],
})
export class SignUpComponent {
  serverError: string = '';
  isShowingVerify: boolean = false;
  externalData!: IExternalSignUp;
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      confirmPasswordValidator('password'),
    ]),
    policy: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private navigation: NavigationService
  ) {
    if (userService.userState) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id:
        '332205403560-d3oanc4nkkussj9ffcpl1motsg665jna.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this,'Google'),
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
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.router.navigate([this.navigation.returnPerviousUrl()]);
      }
      this.externalData = res;
    },
    (err) => {
      this.serverError = err?.error?.detail;
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
  onSubmit() {
    if (this.signUpForm.invalid) {
      for (const key in this.signUpForm.controls) {
        this.signUpForm.get(key)?.markAsDirty();
        this.signUpForm.get(key)?.markAsTouched();
      }
      return;
    }
    let user: ISignUp = {
      email: this.signUpForm.get('email')?.value ?? '',
      fullName: this.signUpForm.get('fullName')?.value ?? '',
      phoneNumber: this.signUpForm.get('phoneNumber')?.value ?? '',
      password: this.signUpForm.get('password')?.value ?? '',
      confirmPassword: this.signUpForm.get('confirmPassword')?.value ?? '',
      policy: true,
    };

    this.userService.registerUser(user).subscribe({
      next: (res: any) => {
        console.log(res?.tempOTP);
        this.isShowingVerify = true;
      },
      error: (err: any) => {
        this.serverError = err?.error?.detail;
      },
    });
  }
}
export function confirmPasswordValidator(
  passwordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;

    const password = control.parent.get(passwordControlName);
    const confirmPassword = control;

    if (!password || !confirmPassword) return null;

    if (confirmPassword.value !== password.value)
      return { passwordsDoNotMatch: true };

    return null;
  };
}
