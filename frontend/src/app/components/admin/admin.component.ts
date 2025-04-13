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
  public serverURL: string = 'http://localhost:7070/';

  public titleModal!: string;

  public selectedCategoryImage: File | null = null;
  public selectedItemImage: File | null = null;

  public isShowModal: boolean = false;
  public chosedCategory: string = '';

  public categories!: Category[];
  public products!: Item[];

  public currentIdItem!: number;

  public categoryForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  public itemForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
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

    this.productService.getItems().subscribe(items => {
      this.products = items as Item[];
    })
  }

  public createNewObject(id: number | null = null): void {

    if (this.titleModal.includes('Добавление')) {
      if (this.chosedCategory === 'Category') {

        const formData = new FormData();
        formData.append('title', this.categoryForm.get('title')?.value);
        formData.append('link', this.categoryForm.get('link')?.value);
        if (this.selectedCategoryImage) {
          console.log(this.selectedCategoryImage)
          formData.append('image', this.selectedCategoryImage);
        }

        this.categoryService.createCategory(formData).subscribe(category => {
          this.isShowModal = false;

          this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories as Category[];
          })

          this.categoryForm.reset();
        });


      }
      else if (this.chosedCategory === 'Item') {
        const data = {...this.itemForm.value};

        const categoryTitle: string = data.category;
        this.categoryService.getCategoryByName(categoryTitle).subscribe(category => {

          console.log(categoryTitle, category);
          const categoryCat: Category = category as Category;

          const formData = new FormData();
          formData.append('title', data.title);
          formData.append('description', data.description);
          formData.append('price', data.price);
          formData.append('category', JSON.stringify({
            id: categoryCat.id,
            title: categoryCat.title,
            link: categoryCat.link,
            image: categoryCat.image,
          }));
          formData.append('size', JSON.stringify({
            width: data.width,
            length: data.length,
            height: data.height
          }));
          if (this.selectedItemImage) {
            formData.append('image', this.selectedItemImage);
          }

          console.log(Object.fromEntries(formData))

          this.productService.createItem(formData).subscribe(item => {
            this.isShowModal = false;
            this.chosedCategory = '';

            this.itemForm.reset();

            this.productService.getItems().subscribe(products => {
              this.products = products as Item[];
            })

          })
        })

      }
    }
    else {
      if (this.chosedCategory === 'Category') {
        const formData = new FormData();
        formData.append('title', this.categoryForm.get('title')?.value);
        formData.append('link', this.categoryForm.get('link')?.value);
        if (this.selectedCategoryImage) {
          console.log(this.selectedCategoryImage)
          formData.append('image', this.selectedCategoryImage);
        }

        const title = Object.fromEntries(formData)['title'];
        console.log(title as string)

        // console.log(this.currentIdItem)
        this.categoryService.updateById(this.currentIdItem, formData).subscribe(category => {
          this.closeModal()
          this.chosedCategory = '';

          this.categoryForm.reset();

          this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories as Category[];
          })
        })
      }
      else if (this.chosedCategory === 'Item') {
        const data = {...this.itemForm.value};

        console.log(this.currentIdItem)
        const categoryTitle: string = data.category;
        this.categoryService.getCategoryByName(categoryTitle).subscribe(category => {

          console.log(categoryTitle, category);
          const categoryCat: Category = category as Category;

          const formData = new FormData();
          formData.append('title', data.title);
          formData.append('description', data.description);
          formData.append('price', data.price);
          formData.append('category', JSON.stringify({
            id: categoryCat.id,
            title: categoryCat.title,
            link: categoryCat.link,
            image: categoryCat.image,
          }));
          formData.append('size', JSON.stringify({
            width: data.width,
            length: data.length,
            height: data.height
          }));
          if (this.selectedItemImage) {
            formData.append('image', this.selectedItemImage);
          }

          console.log(Object.fromEntries(formData))
          // let dataRequest = formData.get("");
          this.productService.updateById(this.currentIdItem, formData).subscribe(item => {
            this.isShowModal = false;
            this.chosedCategory = '';

            this.itemForm.reset();

            this.productService.getItems().subscribe(products => {
              this.products = products as Item[];
            })
          })
          // this.productService.createItem(formData).subscribe(item => {
          //   this.isShowModal = false;
          //   this.chosedCategory = '';
          //
          //   this.itemForm.reset();
          //
          //   this.productService.getItems().subscribe(products => {
          //     this.products = products as Item[];
          //   })
          //
          // })
        })
      }
    }
  }

  public closeModal(): void {
    this.isShowModal = !this.isShowModal;

    this.categoryForm.reset();
    this.itemForm.reset();
  }

  public showModal(typeModal: string, title: string = 'Добавление '): void {
    this.isShowModal = !this.isShowModal;
    this.chosedCategory = typeModal;

    if (this.chosedCategory === 'Category') {
      this.titleModal = title + 'Категории';
    }
    else {
      this.titleModal = title + 'Товара';
    }
  }

  get formCategoryGetter(): string[] {
    return Object.keys(this.categoryForm.controls);
  }

  get formItemGetter(): string[] {
    return Object.keys(this.itemForm.controls);
  }

  public onFileSelected(event: Event, type: 'Category' | 'Item') {
    console.log("here")
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (type === 'Category') {
        this.selectedCategoryImage = file;
      } else {
        this.selectedItemImage = file;
      }
    }
  }

  public showDetails(item: Item | Category): void {


    this.currentIdItem = item.id as number;
    if ('price' in item) {
      // Товары

      console.log(item);
      this.itemForm.patchValue({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        price: item.price || '',
        category: item.category.title || '',
        width: item.size.width || '',
        length: item.size.length || '',
        height: item.size.height || '',
      });

      this.showModal('Item', 'Изменение ');
    }
    else {
      this.categoryForm.patchValue({
        title: item.title,
        link: item.link,
        image: item.image || '',
      });

      this.showModal('Category', 'Изменение ');
    }
  }

  public deleteItem(id: number, typeModel: string): void {
    if (typeModel === 'Category') {
      this.categoryService.deleteCategory(id).subscribe(category => {
        this.closeModal();
        this.categoryService.getCategories().subscribe(categories => {
          this.categories = categories as Category[];
        })
      });
    }
    else {
      this.productService.deleteItem(id).subscribe(product => {
        this.closeModal();
        this.productService.getItems().subscribe(products => {
          this.products = products as Item[];
        })
      })
    }
  }

}

