import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-DefaultCheckOut',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './DefaultCheckOut.component.html',
  styleUrls: ['./DefaultCheckOut.component.css']
})
export class DefaultCheckOutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }
}
