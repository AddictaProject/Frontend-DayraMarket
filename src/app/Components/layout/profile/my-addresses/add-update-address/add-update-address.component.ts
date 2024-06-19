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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-update-address',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-update-address.component.html',
  styleUrl: './add-update-address.component.css',
})
export class AddUpdateAddressComponent {
  city: any[] = [];
  districts: any[] = [];
  @Input() AddressForm!:FormGroup;
  @Input() isCart: boolean = false;
  @Input() address!: IUserAddress;

  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private router: Router
  ) {
    if (!this.AddressForm)
    this.AddressForm = new FormGroup({
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
      defaultAddress: new FormControl(false),
    });
  }

  ngOnInit() {
    this.settingService.getAllCity().subscribe((res: any) => {
      this.city = res;
    });

    if (this.router.url.includes('update') || this.router.url.includes('cart')) {

      if (!Object.hasOwn(history.state, 'userName') && !this.router.url.includes('cart') )
        this.router.navigateByUrl('profile/my-addresses');

      if(this.router.url.includes('update'))
        this.address = history.state;

      this.settingService
        .getAllCityDistricts(this.address.cityId)
        .subscribe((res: any) => {
          this.districts = res;
        });

      this.AddressForm.patchValue({
        username: this.address.userName,
        phoneNumber: this.address.phoneNumber,
        cityId: this.address.cityId,
        districtId: this.address.districtId,
        buildingNumber: this.address.buildingNumber,
        apartmentNumber: this.address.apartmentNumber,
        floorNumber: this.address.floorNumber,
        street: this.address.street,
        details: this.address.details,
        defaultAddress: this.address.defaultAddress,
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
      defaultAddress: this.AddressForm.get('defaultAddress')?.value ?? false,
      apartmentNumber: this.AddressForm.get('apartmentNumber')?.value || '',
      floorNumber: this.AddressForm.get('floorNumber')?.value || '',
    };
    if (this.router.url.includes('add-address')) {
      this.userService.addUserAddress(address).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('profile/my-addresses');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    else if (this.router.url.includes('update')){
      address.uuid=history.state.uuid;
      this.userService.updateUserAddress(address).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('profile/my-addresses');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
