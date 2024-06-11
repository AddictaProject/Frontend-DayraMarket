import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ICategory } from '../../../../../Models/Category/ICategory';

@Component({
  selector: 'app-secondOffCanvas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './secondOffCanvas.component.html',
  styleUrls: ['./secondOffCanvas.component.css']
})
export class SecondOffCanvasComponent implements OnInit {

  @Input() selectedCategory !: ICategory;

  constructor() { }

  ngOnInit() {
  }


}
