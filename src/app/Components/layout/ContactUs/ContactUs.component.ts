import { UserService } from './../../../Services/UserService/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IContactUs } from '../../../Models/IContactUs';

@Component({
  selector: 'app-ContactUs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ContactUs.component.html',
  styleUrls: ['./ContactUs.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit() {}

  contactUsForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    topic: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
    orderNumber: new FormControl(''),
  });

  onSubmit(e: Event): void {
    if (this.contactUsForm.invalid) {
      for (const key in this.contactUsForm.controls) {
        this.contactUsForm.get(key)?.markAsDirty();
        this.contactUsForm.get(key)?.markAsTouched();
      }
      return;
    }
    const contactUs: IContactUs = {
      firstName: this.contactUsForm.get('firstName')?.value ?? '',
      lastName: this.contactUsForm.get('lastName')?.value ?? '',
      phone: this.contactUsForm.get('phone')?.value ?? '',
      email: this.contactUsForm.get('email')?.value ?? '',
      topic: this.contactUsForm.get('topic')?.value ?? '',
      subject: this.contactUsForm.get('subject')?.value ?? '',
      orderNumber: this.contactUsForm.get('orderNumber')?.value ?? '',
    };

    this._userService.contactUs(contactUs).subscribe();
  }
}
