import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../../Models/IProduct';
import { IProductPagination } from '../../Models/IProductPagination';
import { IProductDetailsParams } from '../../Models/IProductDetailsParams';
import { IProductDetails } from '../../Models/IProductDetails';
import { IProductParams } from '../../Models/IProductParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
