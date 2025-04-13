import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {Category, Item} from '../../interfaces/item';
import {filter, map, Subscription, tap} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  public title!: string;
  private subscriptionCategory: Subscription;
  private subscriptionProducts: Subscription;

  public category!: Category;
  public products!: Item[];

  public serverURL: string = 'http://localhost:7070/';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
    ) {
    this.subscriptionCategory = this.categoryService.category$.subscribe((title: string) => {
      this.title = title;
    });

    this.subscriptionProducts = this.productService.getItems().subscribe((products:Item[]) => {
      this.products = products.filter(product =>
        product.category.title === this.category.title
      );
    });

  }

  ngOnInit() {

    console.log(this.router.url)
    const href = this.router.url.split('/');
    this.title = href[href.length - 1];
    this.categoryService.getCategoryByName(this.title).subscribe(category => {
      this.category = category as Category;
    })

  }

  ngOnDestroy() {
    this.subscriptionCategory.unsubscribe();
    this.subscriptionProducts.unsubscribe();
  }
}
