import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  images = [
    {
      thumb: 'assets/sofa 1.png',
      full: 'assets/sofa 1.png'
    },
    {
      thumb: 'assets/sofa 2.png',
      full: 'assets/sofa 2.png'
    },
    {
      thumb: 'assets/sofa 3.png',
      full: 'assets/sofa 3.png'
    },
    {
      thumb: 'assets/sofa 4.png',
      full: 'assets/sofa 4.png'
    },
    {
      thumb: 'assets/sofa 5.png',
      full: 'assets/sofa 5.png'
    }
  ];

  currentIndex = 0;

  get selectedImage() {
    return this.images[this.currentIndex].full;
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
