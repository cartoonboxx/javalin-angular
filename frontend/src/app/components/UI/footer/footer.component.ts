import { Component } from '@angular/core';
import {Category} from '../../../interfaces/item';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public categories!: Category[];

  constructor(
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories as Category[];
    })
  }
}
