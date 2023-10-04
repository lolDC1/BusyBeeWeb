export interface PagedResult<T> {
  pageNumber: number;
  pageCount: number;
  pageSize: number;
  itemsCount: number;
  results: T[];
}
