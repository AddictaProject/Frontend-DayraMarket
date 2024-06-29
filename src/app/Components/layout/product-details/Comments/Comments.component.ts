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

  constructor(
    public _ProductDetailsService: ProductDetailsService,
  ) { }

  ngOnInit() {

    this._ProductDetailsService.vendorReview$.pipe(
      filter(reviews => reviews.length > 0)
    ).subscribe(reviews => {
      this.vendorReview = reviews;
      this.vendorReview.push(this.vReview ,this.vReview ,this.vReview,this.vReview,this.vReview);
      this.remainNumOfComments =this.vendorReview.length-4;

    }); 
    
    

  }

  showMore() {
    this.showRemainCategories = !this.showRemainCategories;
  }

}
