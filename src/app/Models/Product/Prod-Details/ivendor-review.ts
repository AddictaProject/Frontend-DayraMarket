export interface IVendorReview {
    dateCreated : string,
    rate: number;
    comment: string;
    userName: string;
    description: string;
}


export interface IVendorReviewParam {
   
    vendorUuid: string;
    rateFilter?: number;
}