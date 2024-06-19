import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { UserService } from '../../../../../Services/UserService/user.service';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { CartService } from '../../../../../Services/CartService/cart.service';
import { AddUpdateAddressComponent } from "../../../profile/my-addresses/add-update-address/add-update-address.component";
import { DefaultAddressComponent } from "./default-address/default-address.component";
import { ShowAddressesComponent } from "../../../profile/my-addresses/show-addresses/show-addresses.component";
import { AddressSteps } from '../../../../../Models/Cart/AddressStep';

@Component({
    selector: 'app-address',
    standalone: true,
    templateUrl: './address.component.html',
    styleUrl: './address.component.css',
    imports: [AddUpdateAddressComponent, ReactiveFormsModule, DefaultAddressComponent, ShowAddressesComponent]
})
export class AddressComponent implements OnInit ,OnDestroy {
  addresses: IUserAddress[] = [];
  currentAddress!: IUserAddress ;
  addressSteps=AddressSteps;
  currentAddressStep:AddressSteps=AddressSteps.default;
  city: any[] = [];
  districts: any[] = [];
  addAddressForm = new FormGroup({
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

  selectedCityName: string = '';
  selectedDistrictName: string = '';
  isLoading: boolean = true;
  @Output() nextStep = new EventEmitter<void>();
  totalPrice!: number;

  sub!: Subscription;
  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}


  ngOnInit(): void {
    this.sub = this.cartService.totalPrice$.subscribe((p) => {
      this.totalPrice = p;
    });
    this.settingService.getAllCity().subscribe((res: any) => {

      this.city = res;

      this.userService.getUserAddress().subscribe({
        next: (data: any) => {
          this.addresses = data;
          this.addresses.forEach((add,i)=>{
            add.cityName=this.city.find(c=>c._id==add.cityId)?.name;
            this.settingService.getAllCityDistricts(add.cityId).subscribe({
              next:(districts:any)=>{
                add.districtName=districts.find((d:any)=>d.districtId==add.districtId)?.districtName;
                if(i===this.addresses.length-1)
                  this.isLoading=false;
              },
            })
            if (add.defaultAddress) {
              [this.addresses[0],this.addresses[i]]=[this.addresses[i],this.addresses[0]]
              this.currentAddress=add;
            }
          })

        },
        error: (err) => {
          console.log(err);
        },
      });



    });
  }
  onSubmit() {

    if (this.currentAddressStep !== this.addressSteps.add ) {
      this.orderService.userAddress=this.currentAddress;
      this.nextStep.emit();
      return;
    }

    if (this.addAddressForm.invalid) {
      for (const key in this.addAddressForm.controls) {
        this.addAddressForm.get(key)?.markAsDirty();
        this.addAddressForm.get(key)?.markAsTouched();
      }
      return;
    }

    if (
      this.addAddressForm.get('cityId')?.value === '0' ||
      this.addAddressForm.get('districtId')?.value === '0'
    ) {
      this.addAddressForm.get('cityId')?.markAsDirty();
      this.addAddressForm.get('cityId')?.markAsTouched();
      this.addAddressForm.get('districtId')?.markAsDirty();
      this.addAddressForm.get('districtId')?.markAsTouched();
      return;
    }
    const districtId = this.addAddressForm.get('districtId')?.value;
    const selectedDistrict = this.districts.find(
      (item) => item.districtId === districtId
    );
    this.selectedDistrictName = selectedDistrict
      ? selectedDistrict.districtName
      : '';

    let address: IUserAddress = {
      userName: this.addAddressForm.get('username')?.value || '',
      phoneNumber: this.addAddressForm.get('phoneNumber')?.value || '',
      cityId: this.addAddressForm.get('cityId')?.value || '',
      districtId: districtId || '',
      street: this.addAddressForm.get('street')?.value || '',
      buildingNumber: this.addAddressForm.get('buildingNumber')?.value || '',
      details: this.addAddressForm.get('details')?.value || '',
      defaultAddress: this.addAddressForm.get('defaultAddress')?.value || false,
      apartmentNumber: this.addAddressForm.get('apartmentNumber')?.value || '',
      floorNumber: this.addAddressForm.get('floorNumber')?.value || '',
    };

    this.userService.addUserAddress(address).subscribe({
      next: (res: any) => {
        this.orderService.userAddress = res;
        this.orderService.userAddress.cityName = this.selectedCityName;
        this.orderService.userAddress.districtName = this.selectedDistrictName;
        this.nextStep.emit();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
