import { IProduct } from "./IProduct";

export interface IProductPagination {
  result:IProduct[];
  totalCount:number;
  highestPrice:number;
  lowestPrice:number;
}
