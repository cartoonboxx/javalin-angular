import { Component } from '@angular/core';
import {BasketService} from '../../../services/basket.service';
import {Item} from '../../../interfaces/item';
import {interval} from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  standalone: false,
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.scss'
})
export class CartModalComponent {

  public currentProduct!: Item;
  public isActive: boolean = false;

  constructor(
    private basketService: BasketService
  ) {
  }

  ngOnInit() {
    this.basketService.lastAddedItemSubj.subscribe((product: Item) => {
      this.currentProduct = product;
      this.isActive = true;
      const subInterval = interval(1000).subscribe(number => {
        if (number === 3) {
          this.isActive = false;
          subInterval.unsubscribe();
        }
      })
    })
  }

  public hideModal(): void {
    this.isActive = false;
  }
}
