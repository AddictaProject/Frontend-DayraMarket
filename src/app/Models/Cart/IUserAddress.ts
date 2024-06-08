export interface IUserAddress {
  uuid?:string;
  cityName?:string;
  districtName?:string;
  userName: string;
  phoneNumber: string;
  cityId: string;
  districtId: string;
  street: string;
  buildingNumber: string;
  details: string;
  defaultAddress: boolean;
  apartmentNumber: string;
  floorNumber: string;
}
