import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../Services/UserService/user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  // sub!:Subscription;
  constructor(public userService: UserService, private router: Router) {}
  onClick() {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onProfileClick(e: Event) {}
}
