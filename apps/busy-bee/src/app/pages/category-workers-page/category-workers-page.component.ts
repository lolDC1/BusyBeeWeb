import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-workers-page',
  templateUrl: './category-workers-page.component.html',
  styleUrls: ['./category-workers-page.component.css'],
})
export class CategoryWorkersPageComponent {
  @Input() banner_name: string = '';
}
