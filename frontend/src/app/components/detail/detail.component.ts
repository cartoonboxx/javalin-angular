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

    this.productService.getItemById(id).subscribe((product) => {
      this.currentItem = product as Item;
    })
  }

  blockMinus(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }

  preventNegative(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Убираем всё, что меньше 1
    if (+value < 1) {
      input.value = '1';
      this.countItem = 1;
    }
  }

}
