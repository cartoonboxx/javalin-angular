import {Component, inject} from '@angular/core';
import {HeaderService} from '../../../services/header.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import Link from '../../../interfaces/link';
import { Category } from '../../../interfaces/item'
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public serverURL: string = 'http://localhost:7070/';

  public inputValue: string = '';
  private sub!: Subscription;

  public mainLinks: Link[] = [
    {
      title: 'Главная',
      link: '/',
      image: "icons/home.svg"
    },
    {
      title: 'О нас',
      link: 'about/',
      image: "icons/info.svg"
    },
    {
      title: 'Контакты',
      link: 'contacts/',
      image: "icons/mail-dog.svg"
    }
  ]

  public categories!: Category[];

  constructor(protected headerService: HeaderService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.sub = this.headerService.searchData$.subscribe(value => {
      this.inputValue = value;
    });

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories as Category[];
    })
  }

  public updateRouter(title: string): void {
    this.categoryService.updateCategory(title);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
