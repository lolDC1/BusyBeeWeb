import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { CityService } from '../../services/city.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as querystring from 'querystring';
import { query } from '@angular/animations';
import { UserService } from '../../services/user.service';

@UntilDestroy()
@Component({
  selector: 'app-category-task-page',
  templateUrl: './category-task-page.component.html',
  styleUrls: ['./category-task-page.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CategoryTaskPageComponent implements OnInit{
  @Input() banner_name: string = 'Створення заказу одним кліком ';

  categoryId: string;
  taskOutput?: any;
  title?: string;
  photo?: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private categoryService: CategoryService,
              private taskService: TaskService,) {
    this.categoryId = this.route.snapshot.params['id'];
    if (!this.categoryId) console.log("ERROR. Not found id in url!");
  }

  createOrder() {
    const naming = this.title;
    this.router.navigate(['order-page', this.categoryId], {queryParams: {naming}} );
  }
  tasks: any[] = [];
  ngOnInit(): void {
    this.taskService.getAll().pipe(untilDestroyed(this)).subscribe(model => {
      this.taskOutput = model;
      this.filterTask(this.taskOutput.results);
    });

    this.categoryService.getAll().pipe(untilDestroyed(this)).subscribe(model => {
      this.cards = model;
      this.mergeChildren(this.cards);
      this.titleSearch(this.mergedChildren);
    });
  }
  cards: any;
  mergedChildren: any[] = [];
  mergeChildren(items: any[]): void {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        this.mergedChildren = this.mergedChildren.concat(item.children);
      }
    }
  }
  titleSearch(children: any) {
    for (const category of children) {
      if (category.id == this.categoryId) {
        this.title = category.title;
        return;
      }
      if (category.children && category.children.length > 0) {
        this.titleSearch(category.children);
      }
    }
  }
  filterTask(tasks: any[]): void {
    for (const item of tasks) {
      if (item.categoryId == this.categoryId) {
        const taskWithDataloaded = { ...item, dataloaded: false };
        this.tasks.push(taskWithDataloaded);
      }
    }
  }
}
