import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two-pic',
  standalone: true,
  imports: [],
  templateUrl: './two-pic.component.html',
  styleUrl: './two-pic.component.css'
})
export class TwoPicComponent {
  @Input() firstPic:string = 'assets/images/Picture6.png';
  @Input() secondPic:string = 'assets/images/Picture7.png';
}
