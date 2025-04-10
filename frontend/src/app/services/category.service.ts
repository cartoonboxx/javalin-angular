import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../interfaces/item';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpSource: string = 'http://localhost:7070';

  private categorySubject = new BehaviorSubject<string>('');
  public category$ = this.categorySubject.asObservable();

  updateCategory(title: string): void {
    this.categorySubject.next(title);
  }

  constructor(private http: HttpClient) {
  }

  public getCategories() {
    return this.http.get(`${this.httpSource}/categories`);
  }

  public createCategory(category: FormData) {
    console.log(Object.fromEntries(category));
    return this.http.post(`${this.httpSource}/categories`, category);
  }

  public getCategoryByName(name: string) {
    return this.http.get(`${this.httpSource}/categories/${name}`);
  }

  public deleteCategory(id: number) {
    return this.http.delete(`${this.httpSource}/categories/${id}`);
  }
}
