import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductParams } from '../../Models/Product/All-Products/IProductParams';
import { IProductPagination } from '../../Models/Product/All-Products/IProductPagination';
import { Observable } from 'rxjs';
import { IProductDetailsParams } from '../../Models/Product/Prod-Details/IProductDetailsParams';
import { IProductDetails } from '../../Models/Product/Prod-Details/IProductDetails';
import { Environment } from '../../../enviroment/environment';
import { IVendorReview, IVendorReviewParam } from '../../Models/Product/Prod-Details/ivendor-review';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private URL!: string;
  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/public';
  }

  getProducts(productParams: IProductParams): Observable<IProductPagination> {
    return this.httpClient.get<IProductPagination>(`${this.URL}/products`, {
      params: { ...productParams }
    });
  }

  getProductDetails(productParams: IProductDetailsParams): Observable<IProductDetails> {
    return this.httpClient.get<IProductDetails>(`${this.URL}/products/${productParams.productUuid}`, {
      params: { ...productParams }
    });
  }

  getVendorReview(reviewParams: IVendorReviewParam): Observable<IVendorReview[]> {
    return this.httpClient.get<IVendorReview[]>(`${this.URL}/reviews`, {
      params: { ...reviewParams }
    });
  }
}
