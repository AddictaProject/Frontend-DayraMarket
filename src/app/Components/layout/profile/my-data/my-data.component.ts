import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../Services/UserService/user.service';
import { IResetPassword } from '../../../../Models/User/IResetPassword';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css',
})
export class MyDataComponent implements OnInit, OnDestroy {
  serverError: string = '';
  constructor(private userService: UserService) {}
  myDataForm = new FormGroup({
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
  });
  sub!: Subscription;
  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (data: any) => {
        this.myDataForm.patchValue({
          email: data.email,
          phoneNumber: data.phoneNumber,
          fullName: data.fullName,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSubmit() {
    if (this.myDataForm.invalid) {
      for (const key in this.myDataForm.controls) {
        this.myDataForm.get(key)?.markAsDirty();
        this.myDataForm.get(key)?.markAsTouched();
      }
      return;
    }
    let newPassword: IResetPassword = {
      newPassword: this.myDataForm.get('password')?.value || '',
      confirmNewPassword: this.myDataForm.get('confirmPassword')?.value || '',
    };
    this.userService.resetUserPassword(newPassword).subscribe(
      (res) => {
        Swal.fire({
          title: 'Change Password!',
          text: 'Your password has been changed.',
          icon: 'success',
          buttonsStyling:true,
          confirmButtonColor:"#09764CCC",
        });
        this.myDataForm.get('password')?.reset();
        this.myDataForm.get('confirmPassword')?.reset();
      },
      (err) => {
        this.serverError = err?.error?.detail;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          buttonsStyling:true,
      confirmButtonColor:"#09764CCC",
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
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
