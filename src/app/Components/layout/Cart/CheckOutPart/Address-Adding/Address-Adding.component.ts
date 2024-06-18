import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../../Services/UserService/user.service';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { OrderService } from '../../../../../Services/OrderService/order.service';
import { CartService } from '../../../../../Services/CartService/cart.service';

@Component({
  selector: 'app-Address-Adding',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './Address-Adding.component.html',
  styleUrls: ['./Address-Adding.component.css']
})
export class AddressAddingComponent implements OnInit {
  city:any[]=[];
  districts:any[]=[];
  addAddressForm= new FormGroup({
    username: new FormControl('',[Validators.required ]),
    phoneNumber: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    districtId: new FormControl('0',[Validators.required]),
    cityId: new FormControl('0',[Validators.required]),
    buildingNumber: new FormControl('',[Validators.required]),
    apartmentNumber: new FormControl('',[Validators.required]),
    floorNumber: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required, Validators.minLength(5)]),
    details: new FormControl('',[Validators.required]),
  })

  selectedCityName: string = '';
  selectedDistrictName: string = '';

  @Output() nextStep = new EventEmitter<void>();
  totalPrice!: number;

  constructor(private userService: UserService,private settingService:SettingService,
    private orderService:OrderService ,private cartService:CartService){}


  ngOnInit() {
    this.settingService.getAllCity().subscribe((res:any)=>{
      this.city = res;
    })

    this.cartService.totalPrice$.subscribe(totalprice =>{
      this.totalPrice = totalprice ;
    })

  }


  onCityChange() {
    const cityId = this.addAddressForm.get('cityId')?.value;
    const selectedCity = this.city.find(item => item._id === cityId);
    this.selectedCityName = selectedCity ? selectedCity.name : '';

   let id=this.addAddressForm.get('cityId')?.value || '';
   this.settingService.getAllCityDistricts(id).subscribe((res:any)=>{
     this.districts = res;
   })
  }




  next() {
    this.nextStep.emit();

  }


  onSubmit(){

    if (this.addAddressForm.invalid) {
      for (const key in this.addAddressForm.controls) {
          this.addAddressForm.get(key)?.markAsDirty();
          this.addAddressForm.get(key)?.markAsTouched();
      }
      return;
    }

    if(this.addAddressForm.get('cityId')?.value==='0'
    || this.addAddressForm.get('districtId')?.value==='0')
    {
      this.addAddressForm.get('cityId')?.markAsDirty();
      this.addAddressForm.get('cityId')?.markAsTouched();
      this.addAddressForm.get('districtId')?.markAsDirty();
      this.addAddressForm.get('districtId')?.markAsTouched();
      return
    }
    const districtId = this.addAddressForm.get('districtId')?.value;
    const selectedDistrict = this.districts.find(item => item.districtId === districtId);
    this.selectedDistrictName = selectedDistrict ? selectedDistrict.districtName : '';

    let address:IUserAddress={
      userName: this.addAddressForm.get('username')?.value || '',
      phoneNumber: this.addAddressForm.get('phoneNumber')?.value || '',
      cityId: this.addAddressForm.get('cityId')?.value || '',
      districtId: districtId || '',
      street: this.addAddressForm.get('street')?.value || '',
      buildingNumber: this.addAddressForm.get('buildingNumber')?.value || '',
      details: this.addAddressForm.get('details')?.value || '',
      defaultAddress: false,
      apartmentNumber: this.addAddressForm.get('apartmentNumber')?.value || '',
      floorNumber: this.addAddressForm.get('floorNumber')?.value || '',
    }

    this.userService.addUserAddress(address).subscribe({
      next: (res:any) => {
        this.orderService.userAddress=res;
        this.orderService.userAddress.cityName=this.selectedCityName;
        this.orderService.userAddress.districtName=this.selectedDistrictName;
        this.nextStep.emit();
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }


}
