import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header2Component } from './Header2/Header2.component';
import { HeaderComponent } from './Header/Header.component';

@Component({
  selector: 'app-FHeader',
  standalone: true,
  imports: [ RouterModule ,Header2Component,HeaderComponent],
  templateUrl: './FHeader.component.html',
  styleUrls: ['./FHeader.component.css']
})
export class FHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
