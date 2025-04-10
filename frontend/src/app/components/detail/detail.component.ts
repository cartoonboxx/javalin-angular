import { Component } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Item} from '../../interfaces/item';
import {Router} from '@angular/router';

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

  constructor(public productService: ProductService, public router: Router ) {

  }

  ngOnInit() {
    const linkSplitted = this.router.url.split('/');
    const id: number = Number(linkSplitted[linkSplitted.length - 1]);

    this.productService.getItems().subscribe(items => {
      this.products = items;
      this.products.forEach((product: Item) => {
        if (product.id === id) {
          this.currentItem = product;
          return;
        }
      })
    })
  }

}
