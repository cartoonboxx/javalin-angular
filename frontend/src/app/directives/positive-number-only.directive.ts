import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appPositiveNumberOnly]',
  standalone: false
})
export class PositiveNumberOnlyDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Удаляем всё, что не число или меньше 1
    value = value.replace(/[^0-9]/g, '');

    if (value === '' || +value < 1) {
      value = '1';
    }

    input.value = value;
    this.ngControl.control?.setValue(+value);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Запрещаем "-", "e", "+", и т.п.
    if (['-', '+', 'e'].includes(event.key)) {
      event.preventDefault();
    }
  }

}
