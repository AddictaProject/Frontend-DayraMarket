import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../../../Services/UserService/user.service';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-addresses',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './show-addresses.component.html',
  styleUrl: './show-addresses.component.css'
})
export class ShowAddressesComponent {
  addresses: IUserAddress[] = [];
  city: any[] = [];
  constructor(
    private userService: UserService,
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
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
              },
            })
            if (add.defaultAddress) {
              [this.addresses[0],this.addresses[i]]=[this.addresses[i],this.addresses[0]]
            }
          })

        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
  deleteAddress(id:string){
    this.userService.deleteUserAddress(id).subscribe({
      next:(res:any)=>{
        const addressIndex=this.addresses.findIndex(a=>a.uuid==id);
      this.addresses.splice(addressIndex,1);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
