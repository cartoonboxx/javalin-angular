import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from '../../../interfaces/item';
import {BasketService} from '../../../services/basket.service';
import {isPlatformBrowser} from '@angular/common';
import {platformBrowser} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sendcart',
  standalone: false,
  templateUrl: './sendcart.component.html',
  styleUrl: './sendcart.component.scss'
})
export class SendcartComponent {
  public cartItems!: Item[];
  public priceResult: number = 0;

  public serverURL = 'http://localhost:7070/';

  public isShowModal!: boolean;

  public formSend: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', Validators.required),
  });

  constructor(
    private basketService: BasketService,
    private http: HttpClient
  ) {
    this.cartItems = this.basketService.products;

    this.priceResult = this.cartItems.reduce((prev: number, curr: Item) => {
      if (curr.count) {
        return prev + curr.price * curr.count;
      }
      return prev + curr.price
    }, 0)

    this.basketService.statusSubject.subscribe(status => {
      this.isShowModal = status;
    })
  }

  ngOnInit() {
    this.basketService.productSubject.subscribe((items) => {
      this.cartItems = items;
    })
  }

  public hideModal(): void {

    this.isShowModal = false;
    this.basketService.statusSubject.next(this.isShowModal)
  }

  public saveAndSend(): void {
    const data = {
      products: this.cartItems,
      name: this.formSend.value.name,
      phone: this.formSend.value.phone,
    }

    if (data.name && data.phone) {

      const token = '7889645915:AAHSvhityM0wgTE-yd3cbbB2Eo7QTVd_9KY';
      console.log(data.name, data.phone, this.cartItems);
      const message = `
      Поступил новый заказ!\nИмя: ${data.name}\nНомер телефона: ${data.phone}\nТовары: \n\n${this.cartItems.map(item => `Название: ${item.title}\nКоличество: ${item.count ?? 1}\n\n`).join('')}Итоговая сумма заказа: ${this.priceResult}₽
      `

      const encodedMessage: string = encodeURIComponent(message);

      const formData = new FormData();
      formData.append('message', encodedMessage);

      this.http.post(`${this.serverURL}sendtg`, formData, { responseType: 'text' }).subscribe(res => {
        alert("Ваши данные были отправлены, ожидайте ответа");
        this.basketService.clearCart();
        this.isShowModal = false;
        this.basketService.statusSubject.next(this.isShowModal)
      })

    }
    else {
      alert("Не все данные введены")
    }
  }
}
