import { VariantType } from "./enum/variant-type";


export interface IProductDetails {

    photoPaths:string[];
    selectedStock:IselectedStock;
    availableAttributes:string[];
    product:IProductInDetails;
}


export interface IselectedStock {
    // stockid
    uuid:string;
    price :number;
    attributes:IattributesInSelectedStock[];

}

export interface IattributesInSelectedStock {
    attributeValueUuid:string;
    attributeValue :string;
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
    // averageRate:number;

}

export interface IgroupedVariants {
    values:Ivalues[];
    attributeDisplayName:string;
    type:VariantType
}

export interface Ivalues {
    uuid:string;
    value:string;
}
