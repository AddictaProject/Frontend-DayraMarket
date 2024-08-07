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
  initialVendorReview: IVendorReview[] = [];

  showRemainCategories: boolean = false;
  remainNumOfComments !:number;

  ratingCount: { [key: number]: number } = {};
  rating : number[]=[5,4,3,2,1]
  selectedRating: number | undefined;

  @ViewChild('commentSection', { static: true }) commentSection!: ElementRef;


  constructor(
    public _ProductDetailsService: ProductDetailsService,
    public elementRef: ElementRef
  ) { }

  ngOnInit() {

    this._ProductDetailsService.vendorReview$.subscribe(reviews => {
      this.initialVendorReview = reviews;
      this.vendorReview = reviews;
      this.selectedRating=0;
      this.remainNumOfComments =this.vendorReview.length-4;
      this.calculateRatings();
    });

  }


  // For button
  showMore() {
    this.showRemainCategories = !this.showRemainCategories;
  }

  // For Bar Color In filtration
  calculateRatings() {
    this.ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.initialVendorReview.forEach(review => {
      if (this.ratingCount.hasOwnProperty(review.rate)) {
        this.ratingCount[review.rate]++;
      }
    });
  }

  getWidth(rating: number): string {
    return this.initialVendorReview.length > 0 ? (this.ratingCount[rating] / this.initialVendorReview.length  * 100) + '%' : '0%';
  }

  // Action to review
  filterReviews(rate: number): void {
    this.vendorReview=this.initialVendorReview.filter(review => review.rate===rate);
    this.selectedRating = rate;
  }


  reset(){
    this.vendorReview = this.initialVendorReview;
    this.selectedRating = undefined;
  }


}
