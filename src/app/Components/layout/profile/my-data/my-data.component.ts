import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/User/user.service';

@Component({
  selector: 'app-my-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-data.component.html',
  styleUrl: './my-data.component.css'
})
export class MyDataComponent implements OnInit  {
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (data:any) => {
        this.myDataForm.patchValue({
          email: data.email,
          phoneNumber: data.phoneNumber
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  myDataForm=new FormGroup({
    username:new  FormControl('Mohamed'),
    email: new FormControl('',[Validators.required, Validators.email]),
    phoneNumber: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/)]),
    confirmPassword: new FormControl('',[Validators.required,confirmPasswordValidator('password')]),
  });

  onSubmit(){

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
