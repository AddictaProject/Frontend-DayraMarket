import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NumberOnlyDirective } from '../../../../Directives/number-only.directive';
import { CommonModule } from '@angular/common';
import { ISignUp } from '../../../../Models/User/ISignUp';
import { UserService } from '../../../../Services/UserService/user.service';
import { VerifyComponent } from "../verify/verify.component";
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css',
    imports: [ReactiveFormsModule, NumberOnlyDirective, CommonModule, VerifyComponent ,RouterModule]
})
export class SignUpComponent {
  serverError:string = "";
  isShowingVerify: boolean = false;
  signUpForm= new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    fullName: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/)]),
    confirmPassword: new FormControl('',[Validators.required,confirmPasswordValidator('password')]),
    policy: new FormControl('',[Validators.required]),
  })

  constructor(private userService: UserService,private router: Router){

    if (userService.userState) {
      this.router.navigate(['/']);
    }
  }
  onSubmit(){

    if (this.signUpForm.invalid) {
      for (const key in this.signUpForm.controls) {
          this.signUpForm.get(key)?.markAsDirty();
          this.signUpForm.get(key)?.markAsTouched();
      }
      return;
    }
    let user:ISignUp={
      email:this.signUpForm.get('email')?.value ?? '',
      fullName:this.signUpForm.get('fullName')?.value ?? '',
      phoneNumber:this.signUpForm.get('phoneNumber')?.value ?? '',
      password:this.signUpForm.get('password')?.value ?? '',
      confirmPassword:this.signUpForm.get('confirmPassword')?.value ?? '',
      policy: true,
    };

    this.userService.registerUser(user).subscribe({
      next: (res:any) => {
        console.log(res?.tempOTP);
        this.isShowingVerify=true;
      },
      error: (err:any) => {
        this.serverError= err?.error?.detail
      },
    });
  }
}
export function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent)
      return null;

    const password = control.parent.get(passwordControlName);
    const confirmPassword = control;

    if (!password || !confirmPassword)
      return null;

    if (confirmPassword.value !== password.value)
      return { passwordsDoNotMatch: true };

    return null;
  };
}
