import { ElementRef } from "@angular/core";
import { FilterType } from "./FilterType";

export interface CheckboxFilter {
  id: string;
  name: string;
  isChecked: boolean;
  type:FilterType;
  elemRef?: HTMLElement;
}
