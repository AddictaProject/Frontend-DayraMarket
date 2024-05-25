import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-one-pic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-pic.component.html',
  styleUrl: './one-pic.component.css',
})
export class OnePicComponent {
  @Input() isLeft: boolean = true;
  @Input() isWhiteBg: boolean = true;
  @Input() imgPath: string = 'assets/images/e7036098f030293d2f474dea0eac09a5.jpeg';
  @Input() title:string = 'Trading in your old tech is easier than a lot of things.';
  @Input() paragraph:string = 'Earn cash when you trade in your forgotten tech. It’s a simple way to help do more with what we already have.';
  @Input() buttonText:string = 'Get Started';


}
