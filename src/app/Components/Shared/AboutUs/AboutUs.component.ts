import { Component, OnInit } from '@angular/core';
import { Block2Component } from "./block2/block2.component";
import { ProductSliderComponent } from "../../layout/home/product-slider/product-slider.component";
import { RouterModule } from '@angular/router';

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
