import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntityApiDataProvider} from "./data-providers-base/entity-api-data-provider";
import {ApiQueryParameters} from "../models/base/api/api-query-parameters";
import {UserModel} from "../models/user/user.model";
import {UserCommandModel} from "../models/user/user-command.model";

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityApiDataProvider<UserCommandModel, UserCommandModel,
  UserModel, UserModel, string, ApiQueryParameters> {
  controllerPath = 'users';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  override getById(id: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.baseEntityUrl + '/anon/' + id);
  }

  afterLogin(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseEntityUrl}/after-registration`);
  }

  me(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseEntityUrl}/me`);
  }

  uploadPhoto(formData: FormData): Observable<void> {
    return this.httpClient.put<void>(`${this.baseEntityUrl}/photo`, formData);
  }

  uploadPortfolioFile(formData: FormData): Observable<void> {
    return this.httpClient.post<void>(`${this.baseEntityUrl}/portfolio`, formData);
  }

  removePortfolioFile(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseEntityUrl}/portfolio/${id}`);
  }
}
