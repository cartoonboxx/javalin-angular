import { Component } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {Category} from '../../interfaces/item';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  public title!: string;
  private subscription: Subscription;

  public category!: Category;

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.subscription = this.categoryService.category$.subscribe((title: string) => {
      this.title = title;
    });
  }

  ngOnInit() {

    console.log("hello world!")
    const href = window.location.href.split('/');
    this.title = href[href.length - 1];

    this.categoryService.getCategoryByName(this.title).subscribe(category => {
      this.category = category as Category;
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
