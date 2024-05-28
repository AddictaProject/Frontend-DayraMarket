import { Routes } from '@angular/router';
import { HomeComponent } from './Components/layout/home/home.component';
import { ProductsPageComponent } from './Components/layout/products-page/products-page.component';

export const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"products", component: ProductsPageComponent},
];
