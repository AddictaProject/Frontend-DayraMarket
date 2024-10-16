import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-offer-card-placeholder',
  standalone: true,
  imports: [SkeletonModule,TranslateModule],
  templateUrl: './offer-card-placeholder.component.html',
  styleUrl: './offer-card-placeholder.component.css'
})
export class OfferCardPlaceHolderComponent {

}
