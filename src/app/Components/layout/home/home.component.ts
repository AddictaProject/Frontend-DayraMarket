import { Component } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { ProductSliderComponent } from "./product-slider/product-slider.component";
import { BrandSliderComponent } from "./brand-slider/brand-slider.component";
import { DevicesComponent } from "./devices/devices.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { OnePicComponent } from "./one-pic/one-pic.component";
import { TwoPicComponent } from "./two-pic/two-pic.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [LandingComponent, ProductSliderComponent, BrandSliderComponent, DevicesComponent, TestimonialComponent, OnePicComponent, TwoPicComponent]
})
export class HomeComponent {

}
