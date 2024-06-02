export interface IProduct {
  uuid:string;
  lowestPrice :number;
  displayName:string;
  description:string;
  photos:string[];
  groupedVariants:any[];
  averageRate:number;
}
