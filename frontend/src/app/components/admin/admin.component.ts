import {Component, ViewChild} from '@angular/core';
import { Item, Category } from '../../interfaces/item'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  public isShowModal: boolean = false;
  public chosedCategory: string = '';

  public categories!: Category[];

  public categoryForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  public itemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    width: new FormControl('', Validators.required),
    length: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
  });

  constructor(public categoryService: CategoryService, public productService: ProductService) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories as Category[];
    })
  }

  public createNewObject(): void {

    console.log("hello!")
    console.log(this.chosedCategory)
    if (this.chosedCategory === 'Category') {
      console.log(this.categoryForm.value);

      const category = {...this.categoryForm.value} as Category;
      this.categoryService.createCategory(category).subscribe(category => {
        console.log('data', category)
        this.isShowModal = false;

        this.categoryService.getCategories().subscribe(categories => {
          this.categories = categories as Category[];
        })
      });


    } else if (this.chosedCategory === 'Item') {
      const data = {...this.itemForm.value};

      const categoryTitle = data.category;

      console.log(data, categoryTitle)
      this.categoryService.getCategoryByName(categoryTitle).subscribe(category => {

        const categoryCat: Category = category as Category;
        const item = {
          name: data.name,
          description: data.description ?? '',
          image: data.image,
          price: data.price,
          category: {
            title: categoryCat.title,
            link: categoryCat.link,
            image: categoryCat.image,
          },
          sizes: {
            width: data.width,
            length: data.length,
            height: data.height
          }
        }

        console.log(item)
      })

    }
  }

  public closeModal(): void {
    this.isShowModal = !this.isShowModal;
  }

  public showModal(typeModal: string): void {
    this.isShowModal = !this.isShowModal;
    this.chosedCategory = typeModal;
    console.log(this.chosedCategory);
  }

  get formCategoryGetter(): string[] {
    return Object.keys(this.categoryForm.controls);
  }

  get formItemGetter(): string[] {
    return Object.keys(this.itemForm.controls);
  }
}

