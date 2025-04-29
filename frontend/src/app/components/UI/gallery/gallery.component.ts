import {Component, Input, SimpleChanges} from '@angular/core';
import {serverURL} from '../../../global-variable';

interface Image {
  thumb: string;
  full: string;
}

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

  public serverURL: string = serverURL;

  public imagesData!: Image[];

  currentIndex = 0;

  @Input("images") public images!: string[];

  constructor() {

    console.log("data in gallery", this.images)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['images']) {
      this.collectImages();
    }
  }

  ngOnInit() {
    this.collectImages()
  }

  private collectImages() {
    this.imagesData = this.images.map(item => {
      return {
        thumb: this.serverURL + item,
        full: this.serverURL + item
      }
    })
  }

  get selectedImage() {
    return this.imagesData[this.currentIndex].full;
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }
}
