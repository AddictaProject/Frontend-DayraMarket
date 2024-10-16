import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './Components/Shared/FHeader/Header/Header.component';
import { FooterComponent } from './Components/Shared/Footer/Footer.component';
import { Header2Component } from './Components/Shared/FHeader/Header2/Header2.component';
import { ProductsPageComponent } from './Components/layout/products-page/products-page.component';
import { ShowingProductComponent } from './Components/layout/product-details/Showing-Product/Showing-Product.component';
import { MightLikeComponent } from './Components/layout/product-details/might-like/might-like.component';
import { ProductDetailsComponent } from './Components/layout/product-details/product-details.component';

import { FHeaderComponent } from './Components/Shared/FHeader/FHeader.component';
import { MobileFilterComponent } from './Components/layout/products-page/mobile-filter/mobile-filter.component';
import { FilterComponent } from './Components/layout/products-page/filter/filter.component';
import { FilterSecComponent } from './Components/layout/products-page/filter-sec/filter-sec.component';
import { VerifyComponent } from './Components/layout/User/verify/verify.component';
import { SignUpComponent } from './Components/layout/User/sign-up/sign-up.component';
import { SignInComponent } from './Components/layout/User/sign-in/sign-in.component';
import { filter } from 'rxjs';
import { NavigationService } from './Services/NavigationService/navigation.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './Services/localiztionService/localization.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    Header2Component,
    ProductsPageComponent,
    ShowingProductComponent,
    MightLikeComponent,
    ProductDetailsComponent,
    MobileFilterComponent,
    FilterComponent,
    FilterSecComponent,
    FHeaderComponent,
    VerifyComponent,
    SignUpComponent,
    SignInComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'Dayra Market';

  isNotFound: boolean = false;
  isArabic: boolean = false;
  constructor(
    private navigation: NavigationService,
    private router: Router,
    private translate: TranslateService,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    let lang=localStorage.getItem('language') ?? 'en';
    this.translate.use(lang);

    this.localizationService.IsArabic.subscribe(ar=>this.isArabic=ar);
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // this.isNotFound = this.router.routerState.snapshot.root.firstChild?.routeConfig?.path === '**';
        this.isNotFound = this.router.url.includes('/not-found');
      });
  }
}
