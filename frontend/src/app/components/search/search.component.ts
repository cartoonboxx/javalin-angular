import { Component } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Item} from '../../interfaces/item';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {SortService} from '../../services/sort.service';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private subscriptionProduct!: Subscription;
  private subscriptionSort!: Subscription;

  public serverURL = 'http://localhost:7070/';

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
          if (a.price >= b.price && this.typeSort === 1) {
            return -1;
          }
          else {
            return 1;
          }
        })
      })
    })
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
