import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Review-Order',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Review-Order.component.html',
  styleUrls: ['./Review-Order.component.css']
})
export class ReviewOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }
}
