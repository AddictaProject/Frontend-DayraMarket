import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class ProductDetailsComponent implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {

  }

  @ViewChild(CommentsComponent, { static: true }) commentComponent: CommentsComponent | undefined;



  scrollToCommentsSection() {
    if (this.commentComponent && this.commentComponent.elementRef) {
      this.commentComponent.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
