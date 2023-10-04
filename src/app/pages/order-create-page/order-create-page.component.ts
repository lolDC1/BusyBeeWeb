import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskTimes} from "../../enums/task-times.enum";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {CategoryService} from "../../services/category.service";
import {TaskCreateCommandModel} from "../../models/task/task-create-command.model";
import {CityService} from "../../services/city.service";
import {ListItem} from "../../models/base/list-item";
import {AuthService} from "../../services/auth.service";
import {DataTemplateModel} from "../../models/data-template/data-template.model";
import {DataTemplateType} from "../../enums/data-template-type.enum";
import {TaskStringDataValueResponse} from "../../models/task/task-data/task-string-data-value-response.model";
import {TaskSelectionDataValueResponse} from "../../models/task/task-data/task-selection-data-value-response.model";

@UntilDestroy()
@Component({
  selector: 'app-order-create-page',
  templateUrl: './order-create-page.component.html',
  styleUrls: ['./order-create-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderCreatePageComponent implements OnInit {
  TaskTimes = TaskTimes;
  title?: string;
  categoryId: string;
  form: FormGroup<{
    title: FormControl<string>,
    description: FormControl<string>,
    confidentialInfo: FormControl<string>,
    date: FormControl<Date>,
    time: FormControl<TaskTimes>,
    cost: FormControl<number>,
    cityId: FormControl<string | null>
    orderAddressItems: FormGroup
    paymentItems: FormGroup
  }>

  orderAddressDataTemplate?: DataTemplateModel;
  paymentDataTemplate?: DataTemplateModel;
  cities: ListItem[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private categoryService: CategoryService,
              private taskService: TaskService,
              private cityService: CityService) {
    this.categoryId = this.route.snapshot.params['id'];
    if (!this.categoryId) console.log("ERROR. Not found id in url!");

    this.form = new FormGroup({
      title: new FormControl("", {nonNullable: true, validators: [Validators.required]}),
      description: new FormControl("", {nonNullable: true}),
      confidentialInfo: new FormControl("", {nonNullable: true}),
      date: new FormControl(new Date(), {nonNullable: true, validators: [Validators.required]}),
      time: new FormControl(<TaskTimes>TaskTimes.Anytime, {nonNullable: true, validators: [Validators.required]}),
      cost: new FormControl(0, {nonNullable: true}),
      cityId: new FormControl<string | null>(null, {validators: [Validators.required]}),
      orderAddressItems: new FormGroup({}),
      paymentItems: new FormGroup({})
    });
  }

  ngOnInit(): void {
    this.categoryService.getTemplate(this.categoryId).pipe(untilDestroyed(this))
      .subscribe({
        next: model => {
          this.paymentDataTemplate = model.paymentDataTemplate;
          this.orderAddressDataTemplate = model.orderAddressDataTemplate;

          this.orderAddressDataTemplate!.dataTemplateItems.forEach(item => {
            this.form.controls.orderAddressItems.addControl(item.id, new FormControl('', [Validators.required]))
          });
          this.paymentDataTemplate!.dataTemplateItems.forEach(item => {
            if (item.type == DataTemplateType.MultipleSelection) {
              item.selection?.forEach(itemValue => {
                this.form.controls.paymentItems.addControl(itemValue.id, new FormControl(false))
              })
            } else {
              this.form.controls.paymentItems.addControl(item.id, new FormControl('', [Validators.required]))

              if (item.type == DataTemplateType.SingleSelection && item.selection?.some(() => true)) {
                this.form.controls.paymentItems.get(item.id)?.setValue(item.selection[0].id);
              }
            }
          });

          this.calculateCost();
        },
        error: _ => console.log("ERROR. Not found data template for categoryId: " + this.categoryId)
      });

    this.cityService.autocomplete().pipe(untilDestroyed(this))
      .subscribe(items => this.cities = items);

    this.route.queryParams.subscribe(params => {
      this.title = params['naming'];
    });
  }

  getHtmlInputType(dataTemplateType: DataTemplateType): string {
    switch (dataTemplateType) {
      case DataTemplateType.String:
        return 'text';
      case DataTemplateType.SingleSelection:
        return 'radio';
      case DataTemplateType.MultipleSelection:
        return 'checkbox';
    }
    return '';
  }

  calculateCost() {
    this.form.controls.cost.setValue((this.orderAddressDataTemplate?.estimatedCost ?? 0)
      + (this.paymentDataTemplate?.estimatedCost ?? 0));
  }

  getStringByFormControlName(name: string): string {
    const obj = this.form.getRawValue();
    if (obj.paymentItems[name]) return obj.paymentItems[name];
    if (obj.orderAddressItems[name]) return obj.orderAddressItems[name];
    return '';
  }

  getSelectionsByFormControlName(name: string): string[] {
    const obj = this.form.getRawValue();

    // single selection
    if (obj.paymentItems[name]) return [obj.paymentItems[name]];
    if (obj.orderAddressItems[name]) return [obj.orderAddressItems[name]];

    // multiple selection
    return this.paymentDataTemplate!.dataTemplateItems
      .concat(this.orderAddressDataTemplate!.dataTemplateItems)
      .find(x => x.id == name)!
      .selection!
      .map(x => x.id)
      .filter(id => obj.paymentItems[id] === true || obj.orderAddressItems[id] === true);
  }
  publish() {
    if (this.form.invalid) {
      console.log("ERROR. Form is invalid.")
      return;
    }
    if (!this.paymentDataTemplate || !this.orderAddressDataTemplate) {
      console.log("ERROR. Data templates is not loaded.")
      return;
    }
    if (!this.authService.isAuthenticated) {
      console.log("ERROR. User is not auth.")
      return;
    }

    const dataTemplateItems = this.paymentDataTemplate.dataTemplateItems
      .concat(this.orderAddressDataTemplate.dataTemplateItems);

    this.taskService.create(<TaskCreateCommandModel>{
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      confidentialInfo: this.form.controls.confidentialInfo.value,
      date: this.form.controls.date.value.toISOString(),
      time: this.form.controls.time.value,
      cost: this.form.controls.cost.value,
      categoryId: this.categoryId,
      cityId: this.form.controls.cityId.value,
      selections: dataTemplateItems.filter(x => x.type != DataTemplateType.String)
        .map(x => <TaskSelectionDataValueResponse>{
          dataTemplateItemId: x.id,
          values: this.getSelectionsByFormControlName(x.id)
        }),
      strings: dataTemplateItems.filter(x => x.type == DataTemplateType.String)
        .map(x => <TaskStringDataValueResponse>{
          dataTemplateItemId: x.id,
          value: this.getStringByFormControlName(x.id)
        })
    }).pipe(untilDestroyed(this)).subscribe(model => {
      this.router.navigate(['category-page', this.categoryId]);
    })
  }
}
