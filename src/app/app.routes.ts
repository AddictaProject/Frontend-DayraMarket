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
import { SuccessCartComponent } from './Components/layout/Cart/CheckOutPart/SuccessCart/SuccessCart.component';
import { orderPlacedGuard } from './order-placed.guard';
import { ContactUsComponent } from './Components/layout/ContactUs/ContactUs.component';
import { HowItWorksPageComponent } from './Components/Shared/how-it-works-page/how-it-works-page.component';
import { ShippingComponent } from './Components/Shared/FooterPage/shipping/shipping.component';
import { ReturnsAndRefundsComponent } from './Components/Shared/FooterPage/returns-and-refunds/returns-and-refunds.component';
import { TermsOfServiceComponent } from './Components/Shared/FooterPage/terms-of-service/terms-of-service.component';
import { LimitedWarrantyAgreementComponent } from './Components/Shared/FooterPage/limited-warranty-agreement/limited-warranty-agreement.component';
import { PrivacyComponent } from './Components/Shared/FooterPage/privacy/privacy.component';
import { DayraCookiesComponent } from './Components/Shared/FooterPage/dayra-cookies/dayra-cookies.component';
import { AboutUsComponent } from './Components/Shared/AboutUs/AboutUs.component';

export const routes: Routes = [
  {path:"", component: HomeComponent},
  { path: 'Home', component: HomeComponent, title: 'Home' },
  { path: 'products', component: ProductsPageComponent, title: 'Products' },
  { path: 'product/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'cart', component:CartComponent, title: 'Cart' },
  { path:'order-placed',component:SuccessCartComponent ,canActivate:[orderPlacedGuard]},
  { path: 'no-account', component:NoAccountComponent, title: 'No Account' },
  { path: 'login', component:SignInComponent, title: 'Login' },
  { path: 'signup', component:SignUpComponent, title: 'SignUp' },
  { path: 'profile', component:ProfileComponent, title: 'Profile' ,canActivate: [userGuard],children:[
      { path: '', component:MyDataComponent },
      { path: 'order-history', component:OrderHistoryComponent },
      { path: 'my-addresses',children:[
        { path: '', component:ShowAddressesComponent },
        { path: 'add-address', component:AddUpdateAddressComponent },
        { path: 'update-address', component:AddUpdateAddressComponent }
      ]},
  ]},
  { path: 'contactUs', component: ContactUsComponent , title:'Contact Us'},
  { path: 'aboutUs', component: AboutUsComponent , title:'About Us'},
  { path: 'how-it-works', component: HowItWorksPageComponent , title:'How It Works'},
  { path: 'shipping', component: ShippingComponent , title:'Shipping'},
  { path: 'returns-and-refunds', component: ReturnsAndRefundsComponent , title:'Return & Refunds'},
  { path: 'terms-of-service', component: TermsOfServiceComponent , title:'Terms Of Service'},
  { path: 'limited-warranty-agreement', component: LimitedWarrantyAgreementComponent , title:'Limited Warranty Agreement'},
  { path: 'cookies', component: DayraCookiesComponent },
  { path: 'privacy', component: PrivacyComponent , title:' privacy'},
  { path: 'not-found', component: NotFoundComponent , title:'Not Found'},
  { path: '**', redirectTo: 'not-found' },

];
