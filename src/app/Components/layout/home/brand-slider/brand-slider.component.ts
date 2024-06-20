import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterApiService } from '../../../../Services/FilterServices/filter-api.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../../../Models/Brand/IBrand';

@Component({
  selector: 'app-brand-slider',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './brand-slider.component.html',
  styleUrl: './brand-slider.component.css'
})
export class BrandSliderComponent implements OnInit {
  sub!:Subscription;
  brands:IBrand[]=[];
  constructor(private filterService:FilterApiService) { }
  ngOnInit(): void {
    this.sub=this.filterService.getAllBrand().subscribe(data=>{
      this.brands=data;
      while(this.brands.length<8){
        this.brands.push(...this.brands);
      }
      console.log(this.brands);
    })
  }
}
