import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVariantValues } from '../../../../../../Models/Product/Prod-Details/IVariantValues';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Color.component.html',
  styleUrls: ['./Color.component.css']
})
export class ColorComponent implements OnInit {


  @Input() value!:IVariantValues;
  @Output() variantClick = new EventEmitter<IVariantValues>();


  ngOnInit() {
  }

}
