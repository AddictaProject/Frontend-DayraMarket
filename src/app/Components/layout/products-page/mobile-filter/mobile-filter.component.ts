import { Component } from '@angular/core';
import { FilterService } from '../../../../Services/FilterServices/filter.service';
import { FilterComponent } from "../filter/filter.component";
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-mobile-filter',
    standalone: true,
    templateUrl: './mobile-filter.component.html',
    styleUrl: './mobile-filter.component.css',
    imports: [FilterComponent,CommonModule]
})
export class MobileFilterComponent {
  constructor(public filterService:FilterService) { }

  isShowFilter: boolean = false;
}
