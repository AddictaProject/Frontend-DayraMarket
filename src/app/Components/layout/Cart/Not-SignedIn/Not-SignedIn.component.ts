import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Not-SignedIn',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Not-SignedIn.component.html',
  styleUrls: ['./Not-SignedIn.component.css']
})
export class NotSignedInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
