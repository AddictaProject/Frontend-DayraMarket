import { Component } from '@angular/core';
import { CheckboxFilter, FilterComponent } from '../filter/filter.component';
import { FilterService } from '../../../../Services/FilterServices/filter.service';


@Component({
    selector: 'app-filter-sec',
    standalone: true,
    templateUrl: './filter-sec.component.html',
    styleUrl: './filter-sec.component.css',
    imports: [FilterComponent]
})
export class FilterSecComponent {
  constructor(public filterService: FilterService){}
}
