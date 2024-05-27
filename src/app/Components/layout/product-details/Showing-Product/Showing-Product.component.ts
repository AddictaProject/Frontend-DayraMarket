import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

  constructor() { 

    this.images = [
   
      { source: '../../../../../assets/images/galleri/Frame 402.png',
      thumbnail: '../../../../../assets/images/galleri/Frame 402.png', alt: 'Image 1', title: 'Title 1' },


       { source: '../../../../../assets/images/galleri/Frame 403.png',
       thumbnail: '../../../../../assets/images/galleri/Frame 403.png', alt: 'Image 1', title: 'Title 1' },

       { source: '../../../../../assets/images/galleri/Frame 405.png',
       thumbnail: '../../../../../assets/images/galleri/Frame 405.png', alt: 'Image 1', title: 'Title 1' },
    

       { source: '../../../../../assets/images/galleri/Frame 404.png',
       thumbnail: '../../../../../assets/images/galleri/Frame 404.png', alt: 'Image 1', title: 'Title 1' },
 
       { source: '../../../../../assets/images/galleri/Frame 405.png',
       thumbnail: '../../../../../assets/images/galleri/Frame 405.png', alt: 'Image 1', title: 'Title 1' },
    
      ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
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
  
}
