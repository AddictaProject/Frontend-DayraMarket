import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBrand } from '../../../Models/Brand/IBrand';
import { FilterApiService } from '../../../Services/FilterServices/filter-api.service';

@Component({
  selector: 'app-Footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  brands: IBrand[] = [];
  constructor(
    private filterService: FilterApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.filterService.getAllBrand().subscribe((data) => {
      this.brands = data;
    });
  }

  goToBrand(brandId: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log(history);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { brandId } });
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
