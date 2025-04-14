import {Component, inject} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {Item} from '../../interfaces/item';
import {Subscription} from 'rxjs';
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

  public serverURL: string = 'http://localhost:7070/';

  private basketService = inject(BasketService);

  constructor(
    private productService: ProductService,
  ) {
    this.products = this.basketService.products;
    console.log(this.products);
    this.price = this.basketService.price;

    this.productsSub = this.basketService.productSubject.subscribe((products: Item[]) => {
      console.log("from subj2", products)
      this.products = products;
    })

    this.productService.getItems().subscribe(products => {
      this.productsYouLike = products;
      console.log(this.productsYouLike);
    })
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

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.priceSub.unsubscribe();
  }
}
