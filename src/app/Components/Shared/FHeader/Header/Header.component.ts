import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../Services/UserService/user.service';

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentOffcanvasState: string | null = null;

  constructor(
    private offCanvasOb: OffCanvasService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.offCanvasOb.offcanvasState$.subscribe((state) => {
      this.currentOffcanvasState = state;
    });
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]);
    });
  }
  search(searchResult: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/search', {
        state: { searchResult: searchResult },
      });
    });
  }
}
