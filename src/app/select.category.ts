import { Injectable } from '@angular/core';
import {Category} from "./Category";
import {SubCategory} from "./SubCategory";

@Injectable()
export class SelectCategory {

  getCategories() {
    return [
      new Category(1, 'Cleaning' ),
      new Category(2, 'Programming' ),
    ];
  }

  getSubCategories() {
    return [
      new SubCategory(1, 1, 'Washing Floor' ),
      new SubCategory(2, 1, 'Washing Window' ),
      new SubCategory(3, 2, 'Create Site'),
      new SubCategory(4, 1, 'Clean luggage'),
      new SubCategory(5, 2, 'Create Programm')
    ];
  }

}
