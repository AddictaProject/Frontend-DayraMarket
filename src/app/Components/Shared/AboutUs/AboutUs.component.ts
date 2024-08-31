import { Component, OnInit } from '@angular/core';
import { Block2Component } from "./block2/block2.component";
import { RouterModule } from '@angular/router';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-AboutUs',
  standalone: true,
  imports: [Block2Component, ProductSliderComponent,RouterModule],
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
