import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ShowingProductComponent } from './Showing-Product/Showing-Product.component';
import { MightLikeComponent } from './might-like/might-like.component';
import { PairsWellComponent } from './pairs-well/pairs-well.component';
import { CommentsComponent } from './Comments/Comments.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    RouterModule,
    ShowingProductComponent,
    MightLikeComponent,
    PairsWellComponent,
    CommentsComponent,
  ],
})
export class ProductDetailsComponent implements OnInit  {
 
  constructor(
    
  ) {}

  ngOnInit() {

  }



}
