import { VariantType } from "./enum/variant-type";


export interface IProductDetails {

    photoPaths:string[];
    selectedStock:IselectedStock;
    availableAttributes:string[];
    product:IProductInDetails;
}


export interface IselectedStock {
    uuid:string;
    price :number;
    attributes:IattributesInSelectedStock[];
    vendorUuid:string;
}

export interface IattributesInSelectedStock {
    attributeValueUuid:string;
    attributeValue :string;
    attributeDisplayName:string;
}

export interface IProductInDetails {
    uuid:string;
    brandDisplayName:string;
    categoryDisplayName: string;
    description:string;
    displayName:string;
    groupedVariants:IgroupedVariants[];
    lowestPrice :number;
    photos:string[];
    reviewCount:number;
    averageRate:number;
    dateCreated:Date;
    comesWith:IComesWith[];

}

export interface IgroupedVariants {
    values:Ivalues[];
    attributeDisplayName:string;
    type:VariantType
}

export interface Ivalues {
    uuid:string;
    value:string;
    hexCode?:string;
}

export interface IComesWith {

    accessoryDisplayName:string;
    accessoryIconPath:string;

}