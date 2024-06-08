import { Component } from '@angular/core';

import { AddAddressComponent } from "./add-address/add-address.component";
import { ShowAddressesComponent } from "./show-addresses/show-addresses.component";

@Component({
    selector: 'app-my-addresses',
    standalone: true,
    templateUrl: './my-addresses.component.html',
    styleUrl: './my-addresses.component.css',
    imports: [AddAddressComponent, ShowAddressesComponent]
})
export class MyAddressesComponent {
  isAddAddress: boolean = false;
}
