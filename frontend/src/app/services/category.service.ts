import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpSource: string = 'http://localhost:7070';

  constructor(private http: HttpClient) {

  }

  public getCategories() {
    return this.http.get(`${this.httpSource}/categories`);
  }

  public createCategory(category: Category) {
    return this.http.post(`${this.httpSource}/categories`, category);
  }

  public deleteCategory(id: number) {
    return this.http.delete(`${this.httpSource}/categories/${id}`);
  }
}
