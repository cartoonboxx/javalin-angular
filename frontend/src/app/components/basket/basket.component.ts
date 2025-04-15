import {Component, inject} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {Item} from '../../interfaces/item';
import {interval, Subscription} from 'rxjs';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {

  public products: Item[] = [];
  public productsYouLike!: Item[];
  private priceSub!: Subscription;
  public price!: number;
  private productsSub!: Subscription;

  public isShowCreatingCart!: boolean;

  public serverURL: string = 'http://localhost:7070/';

  private basketService = inject(BasketService);

  constructor(
    private productService: ProductService,
  ) {
    this.products = this.basketService.products;
    console.log(this.products);
    this.basketService.calcPrice();

    this.price = this.products.reduce((prev, curr) => {
      if (curr.count) {
        return prev + curr.price * curr.count;
      }
      return prev + curr.price
    }, 0);

    this.productsSub = this.basketService.productSubject.subscribe((products: Item[]) => {
      console.log("from subj2", products)
      this.products = products;
    })

    this.productService.getItems().subscribe(products => {
      this.productsYouLike = products;
      console.log(this.productsYouLike);
    })

    this.basketService.statusSubject.subscribe(status => {
      this.isShowCreatingCart = status;
    });
  }

  ngOnInit() {
    this.priceSub = this.basketService.priceSubject.subscribe(price => {
      this.price = price;
    })
  }

  public addToCart(product: Item, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    product.count = 1;
    this.basketService.addToCart(product);
    this.basketService.calcPrice();
  }

  public deleteFromCart(product: Item, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("delete", product)

    this.basketService.deleteFromCart(product);
    this.basketService.calcPrice();
  }

  public createCart() {
    this.isShowCreatingCart = true;
    this.basketService.statusSubject.next(this.isShowCreatingCart)
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.priceSub.unsubscribe();
  }
}
