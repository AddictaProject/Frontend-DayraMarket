export interface IProductDetails {
    uuid:string;
    displayName:string;
    categoryDisplayName: string;
    lowestPrice :number;
    description:string;
    averageRate:number;
    photos:string[];
    groupedVariants:any[];
    selectedStock:any[];
    availableAttributes:string[];

}
