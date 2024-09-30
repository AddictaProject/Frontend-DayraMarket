import { Component } from '@angular/core';
import { UserService } from '../../../../Services/UserService/user.service';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NumberOnlyDirective } from '../../../../Directives/number-only.directive';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from '../verify/verify.component';
import { IResetPassword } from '../../../../Models/User/IResetPassword';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,NumberOnlyDirective, CommonModule, VerifyComponent ,RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  isShowingVerify: boolean = false;
  isResetPassword: boolean = false;
  serverError:string = '';
  forgetPasswordForm= new FormGroup({
    phoneNumber: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)])
  })

  resetPasswordForm= new FormGroup({
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/)]),
    confirmPassword: new FormControl('',[Validators.required,confirmPasswordValidator('password')]),
  })
  constructor(private userService: UserService,private router: Router){
    if (userService.userState) {
      this.router.navigate(['/']);
    }
  }

  onForgetPasswordSubmit() {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.get('phoneNumber')?.markAsDirty();
      this.forgetPasswordForm.get('phoneNumber')?.markAsTouched();
    }
    const phoneNumber=this.forgetPasswordForm.get('phoneNumber')?.value ?? '';

    this.userService.forgetPassword(phoneNumber).subscribe({
      next: (res:any) => {
        console.log(res?.tempOTP);
        this.isShowingVerify=true;
      },
      error: (err:any) => {
        this.serverError= err?.error?.detail
      },
    });
  }
  onResetPasswordSubmit() {
    if (this.resetPasswordForm.invalid) {
      for (const key in this.resetPasswordForm.controls) {
          this.resetPasswordForm.get(key)?.markAsDirty();
          this.resetPasswordForm.get(key)?.markAsTouched();
      }
      return;
    }
    const resetPassword:IResetPassword={
      phoneNumber:this.forgetPasswordForm.get('phoneNumber')?.value ?? '',
      newPassword: this.resetPasswordForm.get('password')?.value || '',
      confirmNewPassword: this.resetPasswordForm.get('confirmPassword')?.value || '',
    }
    this.userService.forgotPasswordReset(resetPassword).subscribe({
      next: (res:any) => {
        this.router.navigate(['/login']);
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
