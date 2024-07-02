import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/Shared/FHeader/Header/Header.component';
import { FooterComponent } from './Components/Shared/Footer/Footer.component';
import { Header2Component } from './Components/Shared/FHeader/Header2/Header2.component';
import { ProductsPageComponent } from "./Components/layout/products-page/products-page.component";
import { ShowingProductComponent } from './Components/layout/product-details/Showing-Product/Showing-Product.component';
import { MightLikeComponent } from './Components/layout/product-details/might-like/might-like.component';
import { ProductDetailsComponent } from './Components/layout/product-details/product-details.component';

import { FHeaderComponent } from './Components/Shared/FHeader/FHeader.component';
import { MobileFilterComponent } from "./Components/layout/products-page/mobile-filter/mobile-filter.component";
import { FilterComponent } from "./Components/layout/products-page/filter/filter.component";
import { FilterSecComponent } from "./Components/layout/products-page/filter-sec/filter-sec.component";
import { VerifyComponent } from "./Components/layout/User/verify/verify.component";
import { SignUpComponent } from "./Components/layout/User/sign-up/sign-up.component";
import { SignInComponent } from "./Components/layout/User/sign-in/sign-in.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, Header2Component, ProductsPageComponent,
    ShowingProductComponent, MightLikeComponent, ProductDetailsComponent, MobileFilterComponent, FilterComponent, FilterSecComponent, FHeaderComponent, VerifyComponent, SignUpComponent, SignInComponent]
})
export class AppComponent implements OnInit {
  title = 'Addicta';

  isNotFound: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isNotFound = this.router.routerState.snapshot.root.firstChild?.routeConfig?.path === '**';
    });
  }


}
