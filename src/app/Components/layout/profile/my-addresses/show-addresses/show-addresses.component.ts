import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../../Services/UserService/user.service';
import { SettingService } from '../../../../../Services/SettingService/setting.service';
import { IUserAddress } from '../../../../../Models/Cart/IUserAddress';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddressSteps } from '../../../../../Models/Cart/AddressStep';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-show-addresses',
  standalone: true,
  imports: [RouterModule, CommonModule,SkeletonModule],
  templateUrl: './show-addresses.component.html',
  styleUrl: './show-addresses.component.css',
})
export class ShowAddressesComponent {
  @Input() addresses: IUserAddress[] = [];
  @Input() isCart: boolean = false;
  @Output() addressStep = new EventEmitter();
  addressSteps = AddressSteps;
  @Output() selectedAddress = new EventEmitter();
  isLoading=true;
  city: any[] = [];
  constructor(
    private userService: UserService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.addresses.length ) {
      this.settingService.getAllCity().subscribe((res: any) => {
        this.city = res;

        this.userService.getUserAddress().subscribe({
          next: (data: any) => {
            this.addresses = data;
            this.addresses.forEach((add, i) => {
              add.cityName = this.city.find((c) => c._id == add.cityId)?.name;
              this.settingService.getAllCityDistricts(add.cityId).subscribe({
                next: (districts: any) => {
                  add.districtName = districts.find(
                    (d: any) => d.districtId == add.districtId
                  )?.districtName;
                  if(i===this.addresses.length-1)
                    this.isLoading=false;
                },
              });
              if (add.defaultAddress)
                [this.addresses[0], this.addresses[i]] = [this.addresses[i],this.addresses[0]];
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
    }
  }
  deleteAddress(id: string) {
    this.userService.deleteUserAddress(id).subscribe({
      next: (res: any) => {
        const addressIndex = this.addresses.findIndex((a) => a.uuid == id);
        this.addresses.splice(addressIndex, 1);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  onAddressClick(e: Event, selectedAddress: IUserAddress) {
    if (!this.isCart) return;

    const currentElem = e.currentTarget as HTMLElement;

    if (currentElem.classList.contains('active')) return;
    const allElem = Array.from(currentElem.parentElement?.children ?? []);

    allElem.forEach((elem) => elem.classList.remove('active'));
    currentElem.classList.add('active');

    this.selectedAddress.emit(selectedAddress);
  }
  onEditClick(e: Event, selectedAddress: IUserAddress) {
    e.stopPropagation();
    if (this.isCart) {
      this.selectedAddress.emit(selectedAddress);
      this.addressStep.emit(AddressSteps.update);
    } else {
      this.router.navigateByUrl('profile/my-addresses/update-address', {
        state: selectedAddress,
      });
    }
  }
}
