import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  activeIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.next();
    }, 3000); // Интервал переключения элементов в миллисекундах (здесь - каждые 3 секунды)
  }

  next() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
  }
}
