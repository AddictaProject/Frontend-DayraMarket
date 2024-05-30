import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-Showing-Product',
  standalone: true,
  templateUrl: './Showing-Product.component.html',
  styleUrls: ['./Showing-Product.component.css'],
  imports: [RouterModule,FormsModule,GalleriaModule,
    DragScrollComponent,
        DragScrollItemDirective,
  ]

})
export class ShowingProductComponent implements OnInit {

  images: any[];
  responsiveOptions: any[];
  activeItem: any;
  
  @ViewChild('LearnMore') LearnMore!: ElementRef;

  constructor(private router: Router) { 

    this.images = [
   
      { source: '../../../../../assets/images/galleri/Frame 430.png',
      thumbnail: '../../../../../assets/images/galleri/Frame 430.png', alt: 'Image 1', title: 'Title 1' },

      { source: '../../../../../assets/images/galleri/Frame 402.png',
      thumbnail: '../../../../../assets/images/galleri/Frame 402.png', alt: 'Image 1', title: 'Title 1' },

   
       { source: '../../../../../assets/images/galleri/Frame 429.png',
       thumbnail: '../../../../../assets/images/galleri/Frame 429.png', alt: 'Image 1', title: 'Title 1' },
    

       { source: '../../../../../assets/images/galleri/Frame 428.png',
       thumbnail: '../../../../../assets/images/galleri/Frame 428.png', alt: 'Image 1', title: 'Title 1' },
 
  
      ];

    this.responsiveOptions = [
      {
        breakpoint: '912px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
    
  }

  ngOnInit() {
  }
  setActiveItem(item: any): void {
    this.activeItem = item;
  }
  
  animateAndNavigate() {
    const element = this.LearnMore.nativeElement;
    
    element.classList.add('dissolve');

    setTimeout(() => {
      // this.router.navigate(['best-picks']); 
    }, 100);
  }

  // offcanvas 

  isOffCanvasVisible = false;

  showOffCanvas() {
    this.isOffCanvasVisible = true;
  }

  hideOffCanvas() {
    this.isOffCanvasVisible = false;
  }


}
