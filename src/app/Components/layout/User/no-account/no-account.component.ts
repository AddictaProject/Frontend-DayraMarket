import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../Services/UserService/user.service';

@Component({
  selector: 'app-no-account',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './no-account.component.html',
  styleUrl: './no-account.component.css'
})
export class NoAccountComponent {
  constructor(private userService: UserService,private router: Router){

    if (userService.userState) {
      this.router.navigate(['/']);
    }
  }
}
