import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ICategory } from '../../../../../Models/Category/ICategory';

@Component({
  selector: 'app-secondOffCanvas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './secondOffCanvas.component.html',
  styleUrls: ['./secondOffCanvas.component.css']
})
export class SecondOffCanvasComponent  {

  @Input() selectedCategory !: ICategory;

  constructor(private router:Router) { }

  goToCategory(categoryId: string) {
    document.querySelectorAll('.offcanvas').forEach(x=>{
      x.classList.remove('show');
    })
    //skipLocationChange:true means dont update the url to / when navigating
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/products`], { state: { categoryId } });
    });
  }

}
