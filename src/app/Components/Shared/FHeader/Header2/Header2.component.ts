import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
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

  constructor(private offCanvasOb: OffCanvasService,
    private renderer: Renderer2
     , private offCanvasListsService:OffCanvasListsService) {}

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

  showOffCanvas(category: ICategory) {
    this.selectedCategory = category;
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (additionalOffCanvas) {
      additionalOffCanvas.classList.add('show');
      this.renderer.addClass(document.body, 'offcanvas-open');
    }
  }
  
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (additionalOffCanvas && !additionalOffCanvas.contains(target) && !target.closest('.categoryOffCanvas')) {
      this.closeAdditionalOffCanvas();
    }
  }

  closeAdditionalOffCanvas() {
    const additionalOffCanvas = document.getElementById('additionalOffCanvas');
    if (additionalOffCanvas) {
      additionalOffCanvas.classList.remove('show');
      this.renderer.removeClass(document.body, 'offcanvas-open');
    }
  }
  
}
