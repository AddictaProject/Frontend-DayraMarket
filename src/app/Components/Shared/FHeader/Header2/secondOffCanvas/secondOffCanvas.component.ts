import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICategory } from '../../../../../Models/Category/ICategory';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizationService } from '../../../../../Services/localiztionService/localization.service';

@Component({
  selector: 'app-secondOffCanvas',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './secondOffCanvas.component.html',
  styleUrls: ['./secondOffCanvas.component.css'],
})
export class SecondOffCanvasComponent implements OnInit  {
  @Input() selectedCategory!: ICategory;
  isArabic: boolean = false;

  constructor(
    private router: Router,
    private localizationService: LocalizationService
  ) {}
  ngOnInit(): void {
    this.localizationService.IsArabic.subscribe(isAr=>this.isArabic=isAr);
  }

  goToCategory(categoryId: string) {
    document.querySelectorAll('.offcanvas').forEach((x) => {
      x.classList.remove('show');
    });
    //skipLocationChange:true means dont update the url to / when navigating
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { categoryId } });
    });
  }
}
