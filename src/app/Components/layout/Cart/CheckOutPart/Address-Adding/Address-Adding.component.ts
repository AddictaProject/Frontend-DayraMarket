import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../../Services/UserService/user.service';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';

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
    username: new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('',[Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    districtId: new FormControl('0',[Validators.required]),
    cityId: new FormControl('0',[Validators.required]),
    buildingNumber: new FormControl('',[Validators.required]),
    apartmentNumber: new FormControl('',[Validators.required]),
    floorNumber: new FormControl('',[Validators.required]),
    street: new FormControl('',[Validators.required]),
    details: new FormControl('',[Validators.required]),
  })
  constructor(private userService: UserService,private settingService:SettingService){}


  ngOnInit() {
    this.settingService.getAllCity().subscribe((res:any)=>{
      this.city = res;
    })
  }
  onCityChange(){
   let id=this.addAddressForm.get('cityId')?.value || '';
   this.settingService.getAllCityDistricts(id).subscribe((res:any)=>{
     this.districts = res;
   })
  }
  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }
  onSubmit(){
    let address:IUserAddress={
      userName: this.addAddressForm.get('username')?.value || '',
      phoneNumber: this.addAddressForm.get('phoneNumber')?.value || '',
      cityId: this.addAddressForm.get('cityId')?.value || '',
      districtId: this.addAddressForm.get('districtId')?.value || '',
      street: this.addAddressForm.get('street')?.value || '',
      buildingNumber: this.addAddressForm.get('buildingNumber')?.value || '',
      details: this.addAddressForm.get('details')?.value || '',
      defaultAddress: false,
      apartmentNumber: this.addAddressForm.get('apartmentNumber')?.value || '',
      floorNumber: this.addAddressForm.get('floorNumber')?.value || '',
    }
    this.userService.addUserAddress(address).subscribe({
      next: (res:any) => {
        console.log(res);
        this.nextStep.emit();
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
