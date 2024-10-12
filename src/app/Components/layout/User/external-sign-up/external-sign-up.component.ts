import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../sign-up/sign-up.component';
import { UserService } from '../../../../Services/UserService/user.service';
import { Router } from '@angular/router';
import { IExternalSignUp } from '../../../../Models/User/IExternalSignUp';
import { VerifyComponent } from "../verify/verify.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-external-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, VerifyComponent,TranslateModule],
  templateUrl: './external-sign-up.component.html',
  styleUrl: './external-sign-up.component.css'
})
export class ExternalSignUpComponent implements OnInit {

  @Input() externalData!:  IExternalSignUp;
  serverError:string = "";
  isShowingVerify: boolean = false;
  signUpForm= new FormGroup({
    email: new FormControl(this.externalData?.email ?? '',[Validators.required, Validators.email]),
    fullName: new FormControl(this.externalData?.fullName,[Validators.required]),
    phoneNumber: new FormControl(this.externalData?.phoneNumber?? '',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    policy: new FormControl('',[Validators.required]),
  })

  constructor(private userService: UserService,private router: Router){

    if (userService.userState) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(): void {
   this.signUpForm.patchValue({
    email: this.externalData?.email?? '',
    fullName: this.externalData?.fullName?? '',
    phoneNumber: this.externalData?.phoneNumber?? '',
   })
  }
  onSubmit(){

    if (this.signUpForm.invalid) {
      for (const key in this.signUpForm.controls) {
          this.signUpForm.get(key)?.markAsDirty();
          this.signUpForm.get(key)?.markAsTouched();
      }
      return;
    }
    let user:IExternalSignUp={
      email:this.signUpForm.get('email')?.value ?? '',
      fullName:this.signUpForm.get('fullName')?.value ?? '',
      phoneNumber:this.signUpForm.get('phoneNumber')?.value ?? '',
      provider:this.externalData.provider,
      subject:this.externalData.subject,
    };

    this.userService.externalRegister(user).subscribe({
      next: (res:any) => {
        // console.log(res?.tempOTP);
        // this.isShowingVerify=true;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/login']);
        })
      },
      error: (err:any) => {
        this.serverError= err?.error?.detail
      },
    });
  }
}
