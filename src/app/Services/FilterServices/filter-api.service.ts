import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrand } from '../../Models/ibrand';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../enviroment/environment';
import { ICategory } from '../../Models/icategory';

@Injectable({
  providedIn: 'root'
})
export class FilterApiService {

  private URL!: string;
  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/public';
  }

  getAllBrand() :Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(`${this.URL}/brands`);
  }

  getAllCategories() :Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(`${this.URL}/categories/tree`);
  }
}
