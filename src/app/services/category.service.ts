import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryModel} from "../models/category/category.model";
import {EntityApiDataProvider} from "./data-providers-base/entity-api-data-provider";
import {ApiQueryParameters} from "../models/base/api/api-query-parameters";
import {CategoryDataTemplatesModel} from "../models/category/category-data-templates.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends EntityApiDataProvider<CategoryModel, CategoryModel,
  CategoryModel, CategoryModel, string, ApiQueryParameters> {
  controllerPath = 'categories';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getTemplate(categoryId: string): Observable<CategoryDataTemplatesModel> {
    return this.httpClient.get<CategoryDataTemplatesModel>(`${this.baseEntityUrl}/${categoryId}/datatemplates`);
  }

  getAll(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.baseEntityUrl);
  }
}
