import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {SortService} from '../../../services/sort.service';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  public isOpen = false;

  constructor(
    private eRef: ElementRef,
    private sortService: SortService
  ) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  public changeTypeSort(sort: number) {
    this.sortService.sendSortData(sort);
    this.toggleMenu();
  }
}
