import { IOrderItem } from "./IOrderItem";

export interface IOrder {
  uuid:string;
  items:IOrderItem[];
}
