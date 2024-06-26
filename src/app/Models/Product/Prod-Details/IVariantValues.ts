import { VariantType } from "./enum/variant-type";

export interface IVariantValues {
  uuid: string;
  displayName: string;
  isClicked: boolean;
  isAvailable: boolean;
  isLoading: boolean;
  hexCode?: string;
}
