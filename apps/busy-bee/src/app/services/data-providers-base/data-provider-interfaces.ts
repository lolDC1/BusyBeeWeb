import { Observable } from 'rxjs';
import { ApiQueryParameters } from '../../models/base/api/api-query-parameters';
import { PagedResult } from '../../models/base/api/paged-result';
import { ListItem } from '../../models/base/list-item';

export interface QueryDataProvider<
  TListResponse,
  TQuery extends ApiQueryParameters
> {
  get(request: TQuery): Observable<PagedResult<TListResponse>>;
}

export interface AutocompleteDataProvider<TAutocomplete = ListItem> {
  autocomplete(): Observable<TAutocomplete[]>;
}

export interface CacheableAutocompleteDataProvider<TAutocomplete = ListItem>
  extends AutocompleteDataProvider<TAutocomplete> {
  data: TAutocomplete[] | undefined;
  isLoaded: boolean;
}

export interface CrudDataProvider<
  TPrimaryKey,
  TCreateCommandDto,
  TUpdateCommandDto,
  TDetailedResponse
> extends CreateDataProvider<TCreateCommandDto, TDetailedResponse>,
    ReadDataProvider<TPrimaryKey, TDetailedResponse>,
    UpdateDataProvider<TPrimaryKey, TUpdateCommandDto, TDetailedResponse>,
    DeleteDataProvider<TPrimaryKey> {}

export interface ReadDataProvider<TPrimaryKey, TDetailedResponse> {
  getById(id: TPrimaryKey): Observable<TDetailedResponse>;
}

export interface CreateDataProvider<TCreateCommandDto, TDetailedResponse> {
  create(item: TCreateCommandDto): Observable<TDetailedResponse>;
}

export interface UpdateDataProvider<
  TPrimaryKey,
  TUpdateCommandDto,
  TDetailedResponse
> {
  update(
    id: TPrimaryKey,
    command: TUpdateCommandDto
  ): Observable<TDetailedResponse>;
}

export interface DeleteDataProvider<TPrimaryKey> {
  delete(id: TPrimaryKey): Observable<unknown>;
}

export interface InMemoryDataProvider<TModel> {
  data$: Observable<TModel[]>;

  setData(data: TModel[]): void;

  getData(): TModel[];
}
