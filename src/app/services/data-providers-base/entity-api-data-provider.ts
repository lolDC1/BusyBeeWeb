import {ApiQueryParameters} from "../../models/base/api/api-query-parameters";
import {ListItem} from "../../models/base/list-item";
import {AutocompleteDataProvider, CrudDataProvider, QueryDataProvider} from "./data-provider-interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PagedResult} from "../../models/base/api/paged-result";
import {QueryStringBuilder} from "./query-string-builder";

export abstract class EntityApiDataProvider<TCreateCommandDto,
  TUpdateCommandDto,
  TListResponse,
  TDetailedResponse,
  TPrimaryKey,
  TQuery extends ApiQueryParameters<any> = ApiQueryParameters<any>,
  TAutocomplete = ListItem<TPrimaryKey>> implements CrudDataProvider<TPrimaryKey, TCreateCommandDto, TUpdateCommandDto, TDetailedResponse>,
  QueryDataProvider<TListResponse, TQuery>,
  AutocompleteDataProvider<TAutocomplete> {
  abstract controllerPath: string;
  private readonly baseUrl: string;

  protected constructor(protected httpClient: HttpClient) {
    this.baseUrl = environment.endpoint;
  }

  protected get baseEntityUrl() {
    return this.baseUrl + this.controllerPath;
  }

  get(request: TQuery): Observable<PagedResult<TListResponse>> {
    const urlParams = QueryStringBuilder.BuildQueryParameters(request);
    return this.httpClient.get<PagedResult<TListResponse>>(this.baseEntityUrl, {params: urlParams});
  }

  autocomplete() {
    return this.httpClient.get<TAutocomplete[]>(this.baseEntityUrl + '/autocomplete');
  }

  create(item: TCreateCommandDto) {
    return this.httpClient.post<TDetailedResponse>(this.baseEntityUrl, item);
  }

  getById(id: TPrimaryKey) {
    return this.httpClient.get<TDetailedResponse>(this.baseEntityUrl + '/' + id);
  }

  update(id: TPrimaryKey, command: TUpdateCommandDto) {
    return this.httpClient.put<TDetailedResponse>(
      this.baseEntityUrl + '/' + id, command
    );
  }

  delete(id: TPrimaryKey) {
    return this.httpClient.delete<void>(this.baseEntityUrl + '/' + id);
  }
}
