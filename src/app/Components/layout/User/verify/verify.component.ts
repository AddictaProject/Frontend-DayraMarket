import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputNavigationDirective } from '../input-navigation.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../Services/UserService/user.service';
import { IVerifyPhoneNumber } from '../../../../Models/User/IVerifyPhoneNumber';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [InputNavigationDirective,ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit  {
  @Input() phoneNumber!: string;
  @Input() isFromForgetPassword: boolean=false;
  @Output() resetPasswordForm=new EventEmitter<boolean>();

  num:number = 60;

  verifyForm= new FormGroup({
    num1: new FormControl('',[Validators.required]),
    num2: new FormControl('',[Validators.required]),
    num3: new FormControl('',[Validators.required]),
    num4: new FormControl('',[Validators.required]),
    num5: new FormControl('',[Validators.required]),
  })
  constructor(private userService: UserService,private router: Router){}
  onSubmit(){
    if (this.verifyForm.invalid)
      return

    let otp=`${this.verifyForm.get('num1')?.value ??''}${this.verifyForm.get('num2')?.value ??''}${this.verifyForm.get('num3')?.value ??''}${this.verifyForm.get('num4')?.value ??''}${this.verifyForm.get('num5')?.value ??''}`;
    let model:IVerifyPhoneNumber={
      phoneNumber: this.phoneNumber,
      otp: otp
    }
    this.userService.verifyPhoneNumber(model).subscribe(res=>{
      if (this.isFromForgetPassword) {
        this.resetPasswordForm.emit(true);
      }
      else {
        this.router.navigate(['/login']);

      }
    })
  }

  ngOnInit(): void {
    let id=setInterval(()=>{
      if (this.num>0) {
        this.num--;
      }
      else
        clearInterval(id);
    },1000)

  }

  onResend(): void {
    this.userService.resendOtp(this.phoneNumber).subscribe((res:any) => {
      console.log(res?.tempOTP);
      this.num = 60;
    });
  }
}
