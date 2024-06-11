import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class OffCanvasListsService {
  private URL!: string;

  constructor(private httpClient: HttpClient) {
    this.URL = Environment.serverURL + '/api/v1/public/';
  }
  getCategoryTree() {
    return this.httpClient.get(this.URL + 'categories/tree');
  }
}
