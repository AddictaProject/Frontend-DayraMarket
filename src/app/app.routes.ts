import { Routes } from '@angular/router';
import { HomeComponent } from './Components/layout/home/home.component';
import { ProductsPageComponent } from './Components/layout/products-page/products-page.component';

import { ProductDetailsComponent } from './Components/layout/product-details/product-details.component';
import { CartComponent } from './Components/layout/Cart/Cart.component';
import { SignInComponent } from './Components/layout/User/sign-in/sign-in.component';
import { SignUpComponent } from './Components/layout/User/sign-up/sign-up.component';
import { ProfileComponent } from './Components/layout/profile/profile.component';
import { MyDataComponent } from './Components/layout/profile/my-data/my-data.component';
import { SavedCardsComponent } from './Components/layout/profile/saved-cards/saved-cards.component';
import { OrderHistoryComponent } from './Components/layout/profile/order-history/order-history.component';
import { userGuard } from './user.guard';
import { NoAccountComponent } from './Components/layout/User/no-account/no-account.component';
import { ShowAddressesComponent } from './Components/layout/profile/my-addresses/show-addresses/show-addresses.component';
import { AddUpdateAddressComponent } from './Components/layout/profile/my-addresses/add-update-address/add-update-address.component';
import { CommentsComponent } from './Components/layout/product-details/Comments/Comments.component';
import { NotFoundComponent } from './Components/layout/NotFound/NotFound.component';

export const routes: Routes = [
  {path:"", component: HomeComponent},
  { path: 'Home', component: HomeComponent, title: 'Home' },
  { path: 'products', component: ProductsPageComponent, title: 'Products' },
  { path: 'product/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'cart', component:CartComponent, title: 'Cart' },
  { path: 'no-account', component:NoAccountComponent, title: 'No Account' },
  { path: 'login', component:SignInComponent, title: 'Login' },
  { path: 'signup', component:SignUpComponent, title: 'SignUp' },
  { path: 'profile', component:ProfileComponent, title: 'Profile' ,canActivate: [userGuard],children:[

      { path: '', component:MyDataComponent },
      { path: 'saved-cards', component:SavedCardsComponent },
      { path: 'order-history', component:OrderHistoryComponent },
      { path: 'my-addresses',children:[
        { path: '', component:ShowAddressesComponent },
        { path: 'add-address', component:AddUpdateAddressComponent },
        { path: 'update-address', component:AddUpdateAddressComponent }
      ]},
  ]},
  { path: 'not-found', component: NotFoundComponent , title:'Not Found'},
  { path: '**', redirectTo: 'not-found' },

];
