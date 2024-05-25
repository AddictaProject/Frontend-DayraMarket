import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Header2',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './Header2.component.html',
  styleUrls: ['./Header2.component.css'],
})
export class Header2Component implements OnInit {
  constructor() {}

  ngOnInit() {}


  smartTechList: string[] = [
    'iPhone',
    'MacBook',
    'iPad',
    'Apple Watch',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
  ];


  isOffCanvasVisible = false;

  showOffCanvas() {
    this.isOffCanvasVisible = true;
  }

  hideOffCanvas() {
    this.isOffCanvasVisible = false;
  }


}
