import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public isAdminPanelOpen(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;

      console.log("is admin!!!")
      if (url.includes('admin')) {
        return true;
      }
    }
    return false;
  }
}
