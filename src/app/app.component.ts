import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/Shared/Header/Header.component';
import { FooterComponent } from './Components/Shared/Footer/Footer.component';
import { Header2Component } from './Components/Shared/Header2/Header2.component';
import { ProductsPageComponent } from "./Components/layout/products-page/products-page.component";
import { ShowingProductComponent } from './Components/layout/product-details/Showing-Product/Showing-Product.component';
import { MightLikeComponent } from './Components/layout/product-details/might-like/might-like.component';
import { ProductDetailsComponent } from './Components/layout/product-details/product-details.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, Header2Component, ProductsPageComponent , 
      ShowingProductComponent ,MightLikeComponent , ProductDetailsComponent
    ]
})
export class AppComponent {
  title = 'Addicta';


}
