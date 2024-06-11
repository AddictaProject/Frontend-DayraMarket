import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffCanvasService } from '../../../../Services/ProductService/offCanvas.service';
import { OffCanvasListsService } from '../../../../Services/HeaderService/OffCanvasLists.service';
import { ICategory } from '../../../../Models/Category/ICategory';
import { SecondOffCanvasComponent } from "./secondOffCanvas/secondOffCanvas.component";

@Component({
    selector: 'app-Header2',
    standalone: true,
    templateUrl: './Header2.component.html',
    styleUrls: ['./Header2.component.css'],
    imports: [RouterModule, CommonModule, SecondOffCanvasComponent]
})
export class Header2Component implements OnInit {
  category :ICategory[]=[];
  selectedCategory: any;
  isOffcanvasOpen!: boolean ;

  constructor(private offCanvasOb: OffCanvasService , private offCanvasListsService:OffCanvasListsService) {}

  ngOnInit() {
    this.offCanvasOb.isOffcanvasOpen$.subscribe((isOpen) => {
      this.isOffcanvasOpen = isOpen;
    });

    this.offCanvasListsService.getCategoryTree().subscribe({
      next: (res:any) => {
        this.category=res;
      },error(err) {
        console.log(err);
        
      },
    })

  }


  smartTechList: string[] = [
    'iPhone',
    'MacBook',
    'iPad',
    'Apple Watch',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
    'AirPods',
    'HomePod',
  ];

  isOffCanvasVisible = false;

  // showOffCanvas() {
  //   this.isOffCanvasVisible = true;
  // }

  showOffCanvas(category: ICategory) {
    this.selectedCategory = category;
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (additionalOffCanvas) {
      additionalOffCanvas.classList.add('show');
    }
  }

  hideOffCanvas() {
    this.isOffCanvasVisible = false;
  }
}
