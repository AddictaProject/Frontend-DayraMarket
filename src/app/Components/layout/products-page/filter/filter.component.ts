import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CheckboxFilter = {
  id: string;
  name: string;
  isChecked: boolean;
};

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() filters:CheckboxFilter[]=[];
  @Output() public filterChange: EventEmitter<
    CheckboxFilter
  > = new EventEmitter<CheckboxFilter>();
}
