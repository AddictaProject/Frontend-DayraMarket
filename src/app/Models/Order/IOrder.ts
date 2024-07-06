import { IOrderItem } from "./IOrderItem";

export interface IOrder {
  uuid:string;
  serialNumber:string;
  paymentMethod:string;
  redirect_Url:string;
  shippingFees:number
  shippingAddressUuid:string;
  dateCreated:string;
  items:IOrderItem[];
}
