import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../models/category/category.model';

@Component({
  selector: 'app-card',
  templateUrl: './category-card-template.component.html',
  styleUrls: ['./category-card-template.component.css'],
})
export class CategoryCardTemplateComponent {
  // emptyObject: any = {
  //   title: '',
  //   avatar: '',
  //   id: 0,
  //   sub_category: null
  // };
  expandText: boolean = false;
  trackByFn(index: number, item: CategoryModel): string {
    return item.id; // Уникальный идентификатор элемента в вашей модели CategoryModel (может быть другим, в зависимости от вашей логики)
  }

  @Input() id: string = 'Айдишник';
  @Input() title: string = 'Титул';
  @Input() parentId?: string;
  @Input() avatar: string = '';
  @Input() children?: CategoryModel[];
}
