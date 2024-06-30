export interface IVendorReview {
    dateCreated : string,
    rate: number;
    comment: string;
    userName: string;
    description: string;
    purchaseDate: string;
    userCity: string;

}


export interface IVendorReviewParam {
    productUuid: string;
    vendorUuid: string;
    rateFilter?: number;
}