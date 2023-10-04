import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import { Router } from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import { CategoryModel } from '../../models/category/category.model';



@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  cards: any;
  searchTerm: string = '';

  constructor(private categoryService: CategoryService, private router: Router, private _formBuilder: FormBuilder) {
  }

/*  constructor(private router: Router) {}*/
  onSearch() {
    this.router.navigate(['/search-page']);
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  mergedChildren: any[] = [];
  ngOnInit(): void {
    this.categoryService.getAll().pipe(untilDestroyed(this)).subscribe(model => {
      this.cards = model;
      this.mergeChildren(this.cards);
      this.selectedCategory = 'Категорії';
    });
  }
  mergeChildren(items: any[]): void {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        this.mergedChildren = this.mergedChildren.concat(item.children);
        this.mergeChildren(item.children);
      }
    }
  }

  selectedCategory?: string;
  filteredChildren: any[] = [];
  selectCategory(categoryName: string): void {
    if (categoryName === 'Категорії') {
      this.selectedCategory = categoryName;
      this.filteredChildren = this.mergedChildren;
    } else {
      const selectedCategory = this.cards.find((card: CategoryModel) => card.title === categoryName);
      if (selectedCategory) {
        this.selectedCategory = categoryName;
        this.filteredChildren = selectedCategory.children;
      }
    }
  }
}
