import {SortedRequest} from "./sorted-request";
import {PagedRequest} from "./paged-request";
import {SearchRequest} from "./search-request";
import {TypeaheadRequest} from "./typeahead-request";
import {FilterRequest} from "./filter-request";

export interface ApiQueryParameters<TFilter extends object = object>
  extends SortedRequest,
    PagedRequest,
    SearchRequest,
    TypeaheadRequest,
    FilterRequest<TFilter> {
}
