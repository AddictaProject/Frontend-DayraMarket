import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarComponent } from '../../../Shared/star/star.component';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Comments',
  standalone: true,
  imports: [RouterModule ,StarComponent ,CommonModule ,FormsModule, RatingModule],
  templateUrl: './Comments.component.html',
  styleUrls: ['./Comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  value!: number;
  value2=5
}
