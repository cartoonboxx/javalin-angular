import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpSource: string = 'http://localhost:7070';

  constructor(private http: HttpClient) {

  }

  public getItems() {
    return this.http.get(`${this.httpSource}/products`);
  }

  public createItem(item: Item) {
    return this.http.post(`${this.httpSource}/products`, item);
  }

  public deleteItem(id: number) {
    return this.http.delete(`${this.httpSource}/products/${id}`);
  }
}
