import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { FilterService } from '../../../../Services/FilterServices/filter.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-sec',
  standalone: true,
  templateUrl: './filter-sec.component.html',
  styleUrl: './filter-sec.component.css',
  imports: [FilterComponent,TranslateModule],
})
export class FilterSecComponent implements AfterViewInit, OnDestroy {
  @ViewChild('catIconRef') catIconRef!: ElementRef;
  @ViewChild('brandIconRef') brandIconRef!: ElementRef;

  brandSub!: Subscription;
  categorySub!: Subscription;

  isBrandsHasChecked = false;
  isCategoriesHasChecked = false;
  constructor(public filterService: FilterService) {}
  ngOnDestroy(): void {
    this.brandSub?.unsubscribe();
    this.categorySub?.unsubscribe();
  }
  ngAfterViewInit(): void {
   this.brandSub= this.filterService.isBrandsHasChecked.subscribe((val) => {
      this.isBrandsHasChecked = val;
      if (this.isBrandsHasChecked)
        this.filterService.openFilterMenu(this.brandIconRef.nativeElement);
    });
   this.categorySub= this.filterService.isCategoryHasChecked.subscribe((val) => {
      this.isCategoriesHasChecked = val;
      if (this.isCategoriesHasChecked)
        this.filterService.openFilterMenu(this.catIconRef.nativeElement);
    });
  }
}
