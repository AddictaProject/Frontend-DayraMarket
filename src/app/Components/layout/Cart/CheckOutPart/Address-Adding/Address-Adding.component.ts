import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-Address-Adding',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Address-Adding.component.html',
  styleUrls: ['./Address-Adding.component.css']
})
export class AddressAddingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() nextStep = new EventEmitter<void>();

  next() {
    this.nextStep.emit();
  }

}
