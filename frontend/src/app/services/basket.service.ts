import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Item} from '../interfaces/item';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public products!: Item[];
  public productSubject: Subject<Item[]> = new Subject();
  public priceSubject: Subject<number> = new Subject();
  public statusSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public price!: number;

  public lastAddedItemSubj: Subject<Item> = new Subject();

  constructor(
    private localStorageService: LocalStorageService,
  ) {
    this.products = JSON.parse(this.localStorageService.getItem('products')) as Item[];

    if (this.products === null) {
      this.products = [];
      this.createCart();
    }
    else {
      this.price = this.products.reduce((prev, curr) => {
        if (curr.count) {
          return prev + curr.count * curr.price;
        }
        return curr.price + prev;
      }, 0);
      this.calcPrice();
    }
    this.productSubject.subscribe((products: Item[]) => {
      console.log("from subj", products)
    })

    this.productSubject.next(this.products);
  }

  public calcPrice(): void {
    let sum = 0;
    this.products.forEach(product => {
      if (product.count) {
        sum += product.price * product.count;
        return;
      }
      sum += product.price;
    })

    this.priceSubject.next(sum);
  }

  private getCart(): Item[] {
    return JSON.parse(
      this.localStorageService.getItem('products')
    ) as Item[];
  }

  private createCart(): void {
    this.localStorageService.setItem('products', JSON.stringify(this.products));
  }

  public addToCart(product: Item): void {
    let canPush = true;
    for (let item of this.products) {
      console.log(item, product);
      if (item.id === product.id && item.count && product.count) {
        item.count += product.count;
        canPush = false;
        break;
      }
    }
    if (canPush) {
      this.products.push(product);
    }
    this.localStorageService.setItem('products', JSON.stringify(this.products));
    this.productSubject.next(this.products);
    this.calcPrice()

    this.lastAddedItemSubj.next(product);

  }

  public deleteFromCart(product: Item): void {
    for (const item of this.products) {
      if (item.id === product.id) {
        this.products.splice(this.products.indexOf(product), 1);
        break;
      }
    }

    this.localStorageService.setItem('products', JSON.stringify(this.products));
    this.productSubject.next(this.products);
  }

  public clearCart(): void {
    this.products = [];
    this.createCart();
    this.productSubject.next(this.products);
    this.calcPrice();
  }


}
