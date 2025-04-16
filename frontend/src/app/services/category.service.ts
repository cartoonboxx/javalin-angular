import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Category } from '../interfaces/item';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {serverURL} from '../global-variable';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpSource: string = serverURL;

  private categorySubject = new BehaviorSubject<string>('');
  public category$ = this.categorySubject.asObservable();

  updateCategory(title: string): void {
    this.categorySubject.next(title);
  }

  constructor(private http: HttpClient) {
  }

  public getCategories() {
    return this.http.get(`${this.httpSource}categories`);
  }

  public createCategory(category: FormData) {
    console.log(Object.fromEntries(category));
    return this.http.post(`${this.httpSource}categories`, category);
  }

  public getCategoryByName(name: string) {
    return this.http.get(`${this.httpSource}categories/${name}`);
  }

  public deleteCategory(id: number) {
    return this.http.delete(`${this.httpSource}categories/${id}`);
  }

  public updateById(id: number, data: FormData) {
    console.log("id", id);
    return this.http.post(`${this.httpSource}categories/${id}`, data);
  }
}
