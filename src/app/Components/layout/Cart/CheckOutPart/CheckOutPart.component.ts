import { Component, OnInit } from '@angular/core';
import { ProductDetailsService } from '../../../../Services/ProductService/product-details.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-CheckOutPart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './CheckOutPart.component.html',
  styleUrls: ['./CheckOutPart.component.css'],
})
export class CheckOutPartComponent implements OnInit {
  constructor(public _ProductDetailsService: ProductDetailsService) {}

  ngOnInit() {}
  isLogin : boolean =false;
}
