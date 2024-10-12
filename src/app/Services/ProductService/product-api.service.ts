import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductParams } from '../../Models/Product/All-Products/IProductParams';
import { IProductPagination } from '../../Models/Product/All-Products/IProductPagination';
import { Observable } from 'rxjs';
import { IProductDetailsParams } from '../../Models/Product/Prod-Details/IProductDetailsParams';
import { IProductDetails } from '../../Models/Product/Prod-Details/IProductDetails';
import { Environment } from '../../../enviroment/environment';
import { IVendorReview, IVendorReviewParam } from '../../Models/Product/Prod-Details/ivendor-review';
import { IProduct } from '../../Models/Product/All-Products/IProduct';
import { IConditionPhoto } from '../../Models/Category/IConditionPhoto';

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
  getRelatedProducts(productId: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${this.URL}/products/${productId}/related`
    );
  }
  getConditionPhotos(categoryUuid : string): Observable<IConditionPhoto[]> {

    return this.httpClient.get<IConditionPhoto[]>(
      `${this.URL}/categories/${categoryUuid }/condition-photos`
    );
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
