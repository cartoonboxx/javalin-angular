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

  inputValue: string = '';
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

  public categoriesTest: Category[] = [
    {
      title: 'Кухни',
      link: 'kitchens',
      image: 'icons/categories/kitchen-icon.svg'
    },
    {
      title: 'Спальни',
      link: 'bedrooms',
      image: 'icons/categories/bedroom-icon.svg'
    },
    {
      title: 'Гостинные',
      link: 'livingrooms',
      image: 'icons/categories/livingroom-icon.svg'
    },
    {
      title: 'Прихожие',
      link: 'closets',
      image: 'icons/categories/closet-icon.svg'
    },
    {
      title: 'Офисная мебель',
      link: 'offices',
      image: 'icons/categories/office-icon.svg'
    },
    {
      title: 'Детская',
      link: 'childrensrooms',
      image: 'icons/categories/childrensroom-icon.svg'
    },
    {
      title: 'Матрасы',
      link: 'mattresses',
      image: 'icons/categories/mattress.svg'
    },
    {
      title: 'Мягкая мебель',
      link: 'armchairs',
      image: 'icons/categories/armchair.svg'
    },
    {
      title: 'Шкафы',
      link: 'cupboards',
      image: 'icons/categories/cupboard.svg'
    },

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
