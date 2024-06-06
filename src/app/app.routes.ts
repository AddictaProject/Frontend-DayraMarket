import { Routes } from '@angular/router';
import { HomeComponent } from './Components/layout/home/home.component';
import { ProductsPageComponent } from './Components/layout/products-page/products-page.component';

import { ProductDetailsComponent } from './Components/layout/product-details/product-details.component';
import { CartComponent } from './Components/layout/Cart/Cart.component';

export const routes: Routes = [
  {path:"", component: HomeComponent},
  { path: 'Home', component: HomeComponent, title: 'Home' },
  { path: 'products', component: ProductsPageComponent, title: 'Products' },
  { path: 'product-details', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'cart', component:CartComponent, title: 'Cart' },
];
