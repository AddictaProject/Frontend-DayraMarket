import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ContactUs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ContactUs.component.html',
  styleUrls: ['./ContactUs.component.css'],
})
export class ContactUsComponent implements OnInit {
  private googleFormsUrl =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdoxTXTtqCdQh05guqTEKvnUDumzbXQl4UwfK4sV41UNQGj2Q/formResponse';

  constructor(private http: HttpClient,private router:Router) {}

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
  });

  onSubmit(e: Event): void {
    if (this.contactUsForm.invalid) {
      for (const key in this.contactUsForm.controls) {
        this.contactUsForm.get(key)?.markAsDirty();
        this.contactUsForm.get(key)?.markAsTouched();
      }
      return;
    }

    e.preventDefault();
    (e.target as HTMLFormElement).submit()
    this.router.navigateByUrl('');

    // const formData = new FormData();
    // formData.append(
    //   'entry.539873782',
    //   this.contactUsForm.get('firstName')?.value || ''
    // );
    // formData.append(
    //   'entry.2142531620',
    //   this.contactUsForm.get('lastName')?.value || ''
    // );
    // formData.append(
    //   'entry.150329',
    //   this.contactUsForm.get('phone')?.value || ''
    // );
    // formData.append(
    //   'entry.1249400585',
    //   this.contactUsForm.get('email')?.value || ''
    // );
    // formData.append(
    //   'entry.1639120554',
    //   this.contactUsForm.get('topic')?.value || ''
    // );
    // formData.append(
    //   'entry.483276092',
    //   this.contactUsForm.get('orderNumber')?.value || ''
    // );
    // formData.append(
    //   'entry.691399399',
    //   this.contactUsForm.get('subject')?.value || ''
    // );

    // this.http.post(this.googleFormsUrl, formData).subscribe(response => {
    //   console.log('Form submitted successfully', response);
    // }, error => {
    //   console.error('Form submission error', error);
    // });
  }
}
