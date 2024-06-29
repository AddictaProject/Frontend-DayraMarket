import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarComponent } from '../../../Shared/star/star.component';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { ProductApiService } from '../../../../Services/ProductService/product-api.service';
import { IVendorReview } from '../../../../Models/Product/Prod-Details/ivendor-review';
import { filter } from 'rxjs';

@Component({
  selector: 'app-Comments',
  standalone: true,
  imports: [RouterModule, StarComponent, CommonModule, FormsModule, RatingModule],
  templateUrl: './Comments.component.html',
  styleUrls: ['./Comments.component.css']
})
export class CommentsComponent implements OnInit {

  vendorReview: IVendorReview[] = [];
  showRemainCategories: boolean = false;
  remainNumOfComments !:number;
  vReview :IVendorReview ={
    dateCreated :"",
    rate: 3,
    comment: "fkdjfkdjk",
    userName: "nada",
    description: "sdksdjsk",

  }
  vReview2 :IVendorReview ={
    dateCreated :"",
    rate: 2,
    comment: "fkdjfkdjk",
    userName: "nada",
    description: "sdksdjsk",

  }
  ratingCount: { [key: number]: number } = {};
  rating : number[]=[5,4,3,2,1]

  constructor(
    public _ProductDetailsService: ProductDetailsService,
  ) { }

  ngOnInit() {

    this._ProductDetailsService.vendorReview$.pipe(
      filter(reviews => reviews.length > 0)
    ).subscribe(reviews => {
      this.vendorReview = reviews;
      this.vendorReview.push(this.vReview ,this.vReview ,this.vReview,this.vReview,this.vReview,
        this.vReview2,this.vReview2
      );
      this.remainNumOfComments =this.vendorReview.length-4;
      
      this.calculateRatings();
    }); 
    
  
  }

  showMore() {
    this.showRemainCategories = !this.showRemainCategories; 
  }

  calculateRatings() {
    this.ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    this.vendorReview.forEach(review => {
      if (this.ratingCount.hasOwnProperty(review.rate)) {
        this.ratingCount[review.rate]++;
      }
    });

    console.log(this.ratingCount);
  }

  getWidth(rating: number): string {
    return this.vendorReview.length > 0 ? (this.ratingCount[rating] / this.vendorReview.length  * 100) + '%' : '0%';
  }

}
