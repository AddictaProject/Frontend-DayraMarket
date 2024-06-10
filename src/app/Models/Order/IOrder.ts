import { IOrderItem } from "./IOrderItem";

export interface IOrder {
  uuid:string;
  serialNumber:string;
  paymentMethod:string;
  items:IOrderItem[];
}
