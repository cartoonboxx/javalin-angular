import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {Category, Item} from '../../interfaces/item';
import {filter, map, Subscription, tap} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SortService} from '../../services/sort.service';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  public title!: string;
  private subscriptionCategory!: Subscription;
  private subscriptionProducts!: Subscription;
  private subscriptionSort!: Subscription;

  public category!: Category;
  public products!: Item[];

  public serverURL: string = 'http://localhost:7070/';

  public typeSort!: number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: ActivatedRoute,
    private sortService: SortService,
    private basketService: BasketService,
    ) {

    this.router.url.subscribe(url => {
      this.title = url[1].toString();
      this.categoryService.getCategoryByName(this.title).subscribe(category => {
        this.category = category as Category;

        this.subscriptionProducts = this.productService.getItems().subscribe((products:Item[]) => {
          this.products = products.filter(product =>
            product.category.id === this.category.id
          );
        });

      })

    })
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

    this.subscriptionProducts.unsubscribe();
    this.subscriptionSort.unsubscribe();
  }

  public addToCart(product: Item, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    product.count = 1;
    this.basketService.addToCart(product);
  }
}
