import { IReview } from "./IReview";

export interface IOrderItem {
  dateCreated:Date;
  uuid: string;
  price: number;
  status: string;
  productStockUuid: string;
  photoPaths:string[],
  attributes:IAttributesOrder[] ,
  productDisplayName:string,
  orderUuid:string,
  review?:IReview
}

export interface IAttributesOrder {
  uuid?: string;
  attributeDisplayName: string;
  attributeValue: string;
}
