import { LocalizationService } from './../../../Services/localiztionService/localization.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBrand } from '../../../Models/Brand/IBrand';
import { FilterApiService } from '../../../Services/FilterServices/filter-api.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-Footer',
  standalone: true,
  imports: [RouterModule,CommonModule,TranslateModule],
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  brands: IBrand[] = [];
  isArabic: boolean = false;

  constructor(
    private filterService: FilterApiService,
    private router: Router,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.localizationService.IsArabic.subscribe(isAr=>this.isArabic=isAr);

    this.sub = this.filterService.getAllBrand().subscribe((data) => {
      this.brands = data.slice(0,6);
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
