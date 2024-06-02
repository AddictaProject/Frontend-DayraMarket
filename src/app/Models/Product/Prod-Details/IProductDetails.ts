

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
    attributes:any[];

}

export interface IProductInDetails {

    brandDisplayName:string;
    categoryDisplayName: string;
    description:string;
    displayName:string;
    groupedVariants:IgroupedVariants[];
    lowestPrice :number;
    // averageRate:number;

}

export interface IgroupedVariants {

    productUuid:string;
    attributeUuid: string;
    values:Ivalues[];
    attributeDisplayName:string;

}

export interface Ivalues {

    uuid:string;
    value:string;
    isActive:boolean;
}