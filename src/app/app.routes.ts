import { Routes } from '@angular/router';
import { HomeComponent } from './Components/layout/home/home.component';
import { ProductsPageComponent } from './Components/layout/products-page/products-page.component';

import { ProductDetailsComponent } from './Components/layout/product-details/product-details.component';

export const routes: Routes = [
  {path:"", component: HomeComponent},
  { path: 'Home', component: HomeComponent, title: 'Home' },
  { path: 'Products', component: ProductsPageComponent, title: 'Products' },
  { path: 'Product-Details', component: ProductDetailsComponent, title: 'Product Details' },
];
