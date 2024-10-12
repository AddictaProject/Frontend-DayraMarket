import { VariantType } from './enum/variant-type';

export interface IProductDetails {
  photoPaths: string[];
  selectedStock: ISelectedStock;
  availableAttributes: string[];
  product: IProductInDetails;
}

export interface ISelectedStock {
  uuid: string;
  price: number;
  attributes: IAttributesInSelectedStock[];
  vendorUuid: string;
  vendorDisplayName: string;
}

export interface IAttributesInSelectedStock {
  attributeValueUuid: string;
  attributeValue: string;
  attributeDisplayName: string;
}

export interface IProductInDetails {
  uuid: string;
  categoryUuid: string;
  brandDisplayName: string;
  categoryDisplayName: string;
  description: string;
  displayName: string;
  groupedVariants: IgroupedVariants[];
  lowestPrice: number;
  photos: string[];
  reviewCount: number;
  averageRate: number;
  dateCreated: Date;
  comesWith: IComesWith[];
  aspects: IAspects[];
}

export interface IgroupedVariants {
  values: Ivalues[];
  attributeDisplayName: string;
  type: VariantType;
}

export interface Ivalues {
  uuid: string;
  value: string;
  hexCode?: string;
}

export interface IComesWith {
  accessoryDisplayName: string;
  accessoryIconPath: string;
}
export interface IAspects {
  aspectDisplayName: string;
  value: string;
}
