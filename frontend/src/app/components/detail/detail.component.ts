import { Component } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Item} from '../../interfaces/item';
import {Router} from '@angular/router';
import {filter} from 'rxjs';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  public products!: Item[];
  public currentItem!: Item;

  public countItem: number = 1;

  public hitsProducts!: Item[];

  public serverURL: string = 'http://localhost:7070/';

  constructor(
    public productService: ProductService,
    public router: Router,
    private basketService: BasketService,
  ) {
    const linkSplitted = this.router.url.split('/');
    const id: number = Number(linkSplitted[linkSplitted.length - 1]);

    this.productService.getItemById(id).subscribe((product) => {
      console.log("Получил текущий объект", product);
      this.currentItem = product as Item;

      this.productService.getItems().subscribe((products: Item[]) => {
        this.hitsProducts = products.filter((item: Item | null) => {
          if (item == null) {
            return null;
          }

          if (item.id !== this.currentItem.id) {
            return item;
          }

          return null;
        });
      })
    })


  }

  ngOnInit() {

  }

  public addToCart(product: Item, event: Event, count: number = 1): void {
    event.preventDefault();
    event.stopPropagation();
    product.count = count;
    this.basketService.addToCart(product);

    this.countItem = 1;
  }

}
