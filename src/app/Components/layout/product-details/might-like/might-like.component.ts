import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { CardProductDetailsComponent } from '../../../Shared/card-product-details/card-product-details.component';
import { CardComponent } from '../../../Shared/card/card.component';

@Component({
  selector: 'app-might-like',
  standalone: true,
  templateUrl: './might-like.component.html',
  imports: [RouterModule , CardProductDetailsComponent,DragScrollComponent,
    DragScrollItemDirective ],
  styleUrls: ['./might-like.component.css']
})
export class MightLikeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
