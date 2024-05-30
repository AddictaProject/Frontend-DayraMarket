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


  // Styling the beside gallery section

  // Best Picks
  // For LowestPrice
  isActiveLowestPrice: boolean = false;

  // For Most Popular
  isActiveMostPopular: boolean = false;

  toggleActive(card: string): void {
    if (card === 'LowestPrice') {
      this.isActiveLowestPrice = true;
      this.isActiveMostPopular = false; 
    } else if (card === 'MostPopular') {
      this.isActiveMostPopular = true;
      this.isActiveLowestPrice = false; 
    }
  }

  //Condition
  // Fair
  isActiveFair: boolean = false;
  // Good
  isActiveGood: boolean = false;
  // Excellent
  isActiveExcellent: boolean = false;

  toggleActiveCondition(card: string): void {

    if (card === 'Fair') {
      this.isActiveFair = true;
      this.isActiveGood = false; 
      this.isActiveExcellent = false; 
    } else if (card === 'Good') {
      this.isActiveGood = true;
      this.isActiveFair = false; 
      this.isActiveExcellent = false; 

    }else if(card === 'Excellent'){
      this.isActiveGood = false;
      this.isActiveFair = false; 
      this.isActiveExcellent = true; 
    }
  }

  //Storage
  // 128
  is128: boolean = false;
  // 256
  is256: boolean = false;
  // 512
  is512: boolean = false;

  toggleActiveStorage(card: string): void {

    if (card === '128') {
      this.is128 = true;
      this.is256 = false; 
      this.is512 = false; 
    } else if (card === '256') {
      this.is128 = false;
      this.is256 = true; 
      this.is512 = false; 
    }else if(card === '512'){
      this.is128 = false;
      this.is256 = false; 
      this.is512 = true;  
    }
  }

  // color
  // For Grey
  isActiveGrey: boolean = false;

  // For Silver
  isActiveSilver: boolean = false;

  toggleActiveColor(card: string): void {
    if (card === 'Grey') {
      this.isActiveGrey = true;
      this.isActiveSilver = false; 
    } else if (card === 'Silver') {
      this.isActiveSilver = true;
      this.isActiveGrey = false; 
    }
  }

}
