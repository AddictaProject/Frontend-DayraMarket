import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../Services/UserService/user.service';
import { Location } from '@angular/common';
import { NavigationService } from '../../../../Services/NavigationService/navigation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-account',
  standalone: true,
  imports: [RouterModule,TranslateModule],
  templateUrl: './no-account.component.html',
  styleUrl: './no-account.component.css'
})
export class NoAccountComponent {
  constructor(private userService: UserService,private navigation: NavigationService){

    if (userService.userState) {
      this.navigation.back();
    }
  }
}
