import { Component } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Item} from '../../interfaces/item';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {SortService} from '../../services/sort.service';
import {BasketService} from '../../services/basket.service';
import {serverURL} from '../../global-variable';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private subscriptionProduct!: Subscription;
  private subscriptionSort!: Subscription;

  public serverURL = serverURL;

  public products!: Item[];

  public typeSort!: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private sortService: SortService,
    private basketService: BasketService,
  ) {
    this.subscriptionProduct = this.productService.getItems().subscribe(products => {
      this.route.queryParams.subscribe((params) => {
        this.products = products.filter((item: any) => {
          const query = params['q'] || '';
          if (item.title.toLowerCase().includes(query)) {
            return item;
          }
        })
      })
    });
  }

  ngOnInit() {
    this.subscriptionSort = this.sortService.sortSubject.subscribe(sort => {
      this.typeSort = sort;
      this.productService.getItems().subscribe(products => {
        this.products = products.sort((a: Item, b: Item): number => {
          if (this.typeSort === 2) {
            return a.price - b.price;
          } else if (this.typeSort === 1) {
            return b.price - a.price;
          }
          return 0;
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionProduct.unsubscribe();
    this.subscriptionSort.unsubscribe();
  }

  public addToCart(product: Item, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    product.count = 1;
    this.basketService.addToCart(product);
  }
}
