import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityApiDataProvider } from './data-providers-base/entity-api-data-provider';
import { ApiQueryParameters } from '../models/base/api/api-query-parameters';
import { UserModel } from '../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends EntityApiDataProvider<
  UserModel,
  UserModel,
  UserModel,
  UserModel,
  string,
  ApiQueryParameters
> {
  controllerPath = 'users';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  afterLogin(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(
      `${this.baseEntityUrl}/after-registration`
    );
  }

  me(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseEntityUrl}/me`);
  }
}
