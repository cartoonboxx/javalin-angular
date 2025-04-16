import {Component, inject} from '@angular/core';
import {ProductService} from '../../services/product.service';
import { Item } from '../../interfaces/item';
import {Subscription} from 'rxjs';
import {BasketService} from '../../services/basket.service';
import {serverURL} from '../../global-variable';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  public serverURL: string = serverURL;

  public products!: Item[];
  public productSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private basketService: BasketService
  ) {

  }

  ngOnInit() {
    this.productSubscription = this.productService.getItems().subscribe(products => {
      this.products = products as Item[];
      console.log('prods', this.products);
    })
  }

  public addToCart(product: Item, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    product.count = 1;
    this.basketService.addToCart(product);
  }

}
