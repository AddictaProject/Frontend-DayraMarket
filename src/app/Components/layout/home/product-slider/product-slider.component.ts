import { Component } from '@angular/core';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { CardComponent } from "../../../Shared/card/card.component";

@Component({
    selector: 'app-product-slider',
    standalone: true,
    templateUrl: './product-slider.component.html',
    styleUrl: './product-slider.component.css',
    imports: [DragScrollComponent,
        DragScrollItemDirective, CardComponent]
})
export class ProductSliderComponent {

}
