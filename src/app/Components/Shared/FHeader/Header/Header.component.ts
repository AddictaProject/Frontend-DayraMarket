import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../Services/UserService/user.service';

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [ RouterModule,CommonModule],
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {
  isOffcanvasOpen!: boolean;

  constructor(private offCanvasOb : OffCanvasService,public userService:UserService) { }

  ngOnInit() {
    this.offCanvasOb.isOffcanvasOpen$.subscribe((isOpen) => {
      this.isOffcanvasOpen = isOpen;
      console.log(this.isOffcanvasOpen);

    });
  }

  // For Dropdown List Of User :
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


}
