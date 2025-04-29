import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../interfaces/item';
import {Observable} from 'rxjs';
import {serverURL} from '../global-variable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpSource: string = serverURL;

  constructor(private http: HttpClient) {

  }

  public getItems(): Observable<any> {
    return this.http.get(`${this.httpSource}products`);
  }

  public createItem(item: FormData) {
    return this.http.post(`${this.httpSource}products`, item);
  }

  public deleteItem(id: number) {
    return this.http.delete(`${this.httpSource}products/${id}`);
  }

  public getItemById(id: number | string) {
    return this.http.get(`${this.httpSource}products/${id}`);
  }

  public updateById(id: number, data: FormData) {
    return this.http.post(`${this.httpSource}products/${id}`, data);
  }
}
