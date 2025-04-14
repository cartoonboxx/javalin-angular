import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  public sortSubject: Subject<number> = new Subject<number>();

  constructor() {

  }

  public sendSortData(type: number): void {
    this.sortSubject.next(type);
  }
}
