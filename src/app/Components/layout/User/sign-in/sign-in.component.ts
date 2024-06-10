import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/UserService/user.service';
import { ILogin } from '../../../../Models/User/ilogin';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  serverError: boolean = false;
  signInForm= new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),

  })

  constructor(private userService: UserService,private router: Router){

    if (userService.userState) {
      this.router.navigate(['/']);
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
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.serverError=true
        }
      }
    );
  }
}
