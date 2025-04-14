import { Component } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Item} from '../../interfaces/item';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public serverURL: string = 'http://localhost:7070/';

  public products!: Item[];

  constructor(
    private productService: ProductService,
    private basketService: BasketService
  ) {
    this.productService.getItems().subscribe((products: Item[]) => {
      this.products = products;
    })
  }

  public addToCart(product: Item, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    product.count = 1;
    this.basketService.addToCart(product);
  }
}
