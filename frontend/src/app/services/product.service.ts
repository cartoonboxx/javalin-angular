import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpSource: string = 'http://localhost:7070';

  constructor(private http: HttpClient) {

  }

  public getItems(): Observable<any> {
    return this.http.get(`${this.httpSource}/products`);
  }

  public createItem(item: FormData) {
    const currentData = Object.fromEntries(item);
    console.log(currentData);
    console.log(currentData['size'])
    console.log(currentData['category'])
    // currentData['size'] = JSON.parse(currentData['size']);
    return this.http.post(`${this.httpSource}/products`, item);
  }

  public deleteItem(id: number) {
    return this.http.delete(`${this.httpSource}/products/${id}`);
  }

  public getItemById(id: number) {
    return this.http.get(`${this.httpSource}/products/${id}`);
  }
}
