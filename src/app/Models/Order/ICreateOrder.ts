import { PaymentMethod } from "../Cart/PaymentMethod";

export interface ICreateOrder {
  paymentMethod:PaymentMethod;
  shippingAddressUuid:string;
  items:productStockUuid[]
}
export interface productStockUuid{
  productStockUuid:string;
}
