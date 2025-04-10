import {Component, inject} from '@angular/core';
import {ProductService} from '../../services/product.service';
import { Item } from '../../interfaces/item';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  public serverURL: string = 'http://localhost:7070/';

  public products!: Item[];
  public productSubscription!: Subscription;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productSubscription = this.productService.getItems().subscribe(products => {
      this.products = products as Item[];
      console.log('prods', this.products);
    })
  }

}
