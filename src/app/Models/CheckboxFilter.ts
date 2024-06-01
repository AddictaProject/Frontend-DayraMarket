import { FilterType } from "./FilterType";

export interface CheckboxFilter {
  id: string;
  name: string;
  isChecked: boolean;
  type:FilterType
}
