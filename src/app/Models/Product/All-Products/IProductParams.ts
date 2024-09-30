export interface IProductParams {
  brandUuids?: string[];
  categoryUuids?: string[];
  keyword?: string;
  pageNo: number;
  rowCount: number;
  maxPrice?:number ;
}
