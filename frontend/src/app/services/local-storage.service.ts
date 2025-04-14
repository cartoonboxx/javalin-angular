import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public localStorage: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = localStorage;
    }
  }

  public getItem(key: string): any {
    return this.localStorage.getItem(key);
  }

  public setItem(key: string, value: any): void {
    this.localStorage.setItem(key, value);
  }

  public deleteItem(key: string): void {
    this.localStorage.removeItem(key);
  }

}
