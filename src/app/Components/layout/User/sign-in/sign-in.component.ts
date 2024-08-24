import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/UserService/user.service';
import {  NavigationEnd, Router, RouterModule } from '@angular/router';
import { ILogin } from '../../../../Models/User/ILogin';
import { filter } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationService } from '../../../../Services/NavigationService/navigation.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  previousUrl: string='';
  serverError: boolean = false;
  signInForm= new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),

  })

  constructor(private userService: UserService,private router: Router,private navigation: NavigationService){

    if (userService.userState) {
      this.router.navigate([this.navigation.returnPerviousUrl()]);
      return;
    }
  }


  onSubmit(){
    if (this.signInForm.invalid) {
      for (const key in this.signInForm.controls) {
          this.signInForm.get(key)?.markAsDirty();
          this.signInForm.get(key)?.markAsTouched();
      }
      return;
    }
    let user:ILogin={
      email:this.signInForm.get('email')?.value ?? '',
      password:this.signInForm.get('password')?.value ?? '',
    };
    this.userService.login(user).subscribe(
      {
        next: (res:any) => {
          this.serverError=false;
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.router.navigate([this.navigation.returnPerviousUrl()]);
        },
        error: (err) => {
          this.serverError=true
        }
      }
    );
  }
}
