import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardProductDetailsComponent } from '../../../Shared/card-product-details/card-product-details.component';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';

@Component({
  selector: 'app-pairs-well',
  standalone: true,
  imports: [RouterModule ,  CardProductDetailsComponent ,
    DragScrollComponent,
    DragScrollItemDirective
  ],
  templateUrl: './pairs-well.component.html',
  styleUrls: ['./pairs-well.component.css']
})
export class PairsWellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
