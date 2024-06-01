import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductParams } from '../../Models/IProductParams';
import { IProductPagination } from '../../Models/IProductPagination';
import { Observable } from 'rxjs';
import { IProductDetailsParams } from '../../Models/IProductDetailsParams';
import { IProductDetails } from '../../Models/IProductDetails';
import { Environment } from '../../../enviroment/environment';

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

  // product Details
  getProductDetails(productParams: IProductDetailsParams): Observable<IProductDetails> {
    return this.httpClient.get<IProductDetails>(`${this.URL}/products/${productParams.productUuid}`, {
      params: { ...productParams }
    });
  }
}
