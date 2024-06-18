import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { UserService } from '../../../../../Services/UserService/user.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent {
  city: any[] = [];
  districts: any[] = [];

  AddressForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11),
    ]),
    districtId: new FormControl('0', [Validators.required]),
    cityId: new FormControl('0', [Validators.required]),
    buildingNumber: new FormControl('', [Validators.required]),
    apartmentNumber: new FormControl('', [Validators.required]),
    floorNumber: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required, Validators.minLength(5)]),
    details: new FormControl('', [Validators.required]),
  });
  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.settingService.getAllCity().subscribe((res: any) => {
      this.city = res;
    });

    if (this.router.url.includes('update')) {
      console.log(history.state);
      if (!Object.hasOwn(history.state, 'userName'))
        this.router.navigateByUrl('profile/my-addresses');
      let address:IUserAddress=history.state;
      this.settingService
        .getAllCityDistricts(address.cityId)
        .subscribe((res: any) => {
          this.districts = res;
        });
      this.AddressForm.patchValue({
        username: address.userName,
        phoneNumber: address.phoneNumber,
        cityId: address.cityId,
        districtId: address.districtId,
        buildingNumber: address.buildingNumber,
        apartmentNumber: address.apartmentNumber,
        floorNumber: address.floorNumber,
        street: address.street,
        details: address.details,
      });
    }
  }
  onCityChange() {
    let id = this.AddressForm.get('cityId')?.value || '';
    this.settingService.getAllCityDistricts(id).subscribe((res: any) => {
      this.districts = res;
    });
  }
  onSubmit() {
    if (this.AddressForm.invalid) {
      for (const key in this.AddressForm.controls) {
        this.AddressForm.get(key)?.markAsDirty();
        this.AddressForm.get(key)?.markAsTouched();
      }
      return;
    }

    if (
      this.AddressForm.get('cityId')?.value === '0' ||
      this.AddressForm.get('districtId')?.value === '0'
    ) {
      this.AddressForm.get('cityId')?.markAsDirty();
      this.AddressForm.get('cityId')?.markAsTouched();
      this.AddressForm.get('districtId')?.markAsDirty();
      this.AddressForm.get('districtId')?.markAsTouched();
      return;
    }

    let address: IUserAddress = {
      userName: this.AddressForm.get('username')?.value || '',
      phoneNumber: this.AddressForm.get('phoneNumber')?.value || '',
      cityId: this.AddressForm.get('cityId')?.value || '',
      districtId: this.AddressForm.get('districtId')?.value || '',
      street: this.AddressForm.get('street')?.value || '',
      buildingNumber: this.AddressForm.get('buildingNumber')?.value || '',
      details: this.AddressForm.get('details')?.value || '',
      defaultAddress: false,
      apartmentNumber: this.AddressForm.get('apartmentNumber')?.value || '',
      floorNumber: this.AddressForm.get('floorNumber')?.value || '',
    };
    this.userService.addUserAddress(address).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('profile/my-addresses');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}