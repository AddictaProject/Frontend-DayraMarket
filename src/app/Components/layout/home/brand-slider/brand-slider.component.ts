import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterApiService } from '../../../../Services/FilterServices/filter-api.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../../../Models/Brand/IBrand';
import { Environment } from '../../../../../enviroment/environment';
import { LocalizationService } from '../../../../Services/localiztionService/localization.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-slider',
  standalone: true,
  imports: [RouterModule ,CommonModule,TranslateModule],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.css',
})
export class BrandSliderComponent implements OnInit {
  sub!: Subscription;
  brands: IBrand[] = [];
  url = Environment.serverURL;
  isArabic: boolean = false;
  constructor(
    private filterService: FilterApiService,
    private localizationService: LocalizationService
  ) {}
  ngOnInit(): void {
    this.localizationService.IsArabic.subscribe(isAr=>this.isArabic=isAr);
    this.sub = this.filterService.getAllBrand().subscribe((data) => {
      this.brands = data;
      while (this.brands.length < 8) {
        this.brands.push(...this.brands);
      }
    });
  }
}
