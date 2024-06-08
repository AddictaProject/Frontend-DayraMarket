import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../../../Services/UserService/user.service';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-show-addresses',
  standalone: true,
  imports: [],
  templateUrl: './show-addresses.component.html',
  styleUrl: './show-addresses.component.css'
})
export class ShowAddressesComponent {
  @Output() addAddress = new EventEmitter<boolean>();

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
          console.log(this.city);
          this.addresses.forEach(add=>{
            add.cityName=this.city.find(c=>c._id==add.cityId)?.name;
            this.settingService.getAllCityDistricts(add.cityId).subscribe({
              next:(districts:any)=>{
                add.districtName=districts.find((d:any)=>d.districtId==add.districtId)?.districtName;
              },
            })
          })

        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}
