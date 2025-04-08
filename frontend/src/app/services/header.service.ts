import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, filter} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public searchData: string | null = '';

  private searchDataSubject = new BehaviorSubject<string>('');
  public searchData$ = this.searchDataSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.processUrl(window.location.href);

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const href = window.location.origin + event.urlAfterRedirects;
          this.processUrl(href);
        });
    }
  }

  private processUrl(href: string) {
    const url = new URL(href);
    const param = url.searchParams.get('q');
    const path = url.pathname;

    if (path.includes('/search') && param) {
      this.searchDataSubject.next(param);
    } else {
      this.searchDataSubject.next('');
    }
  }
}
