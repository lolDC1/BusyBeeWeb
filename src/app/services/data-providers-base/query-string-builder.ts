import {HttpParams} from "@angular/common/http";

export class QueryStringBuilder {
  static BuildQueryParameters<T>(obj: T) {
    let params: HttpParams = new HttpParams();

    params = QueryStringBuilder.PopulateSearchParams(params, '', obj);

    return params;
  }

  private static PopulateArray<T>(params: HttpParams, prefix: string, val: Array<T>) {
    for (let index in val) {
      let key = prefix + '[' + index + ']';
      let value: any = val[index];
      params = QueryStringBuilder.PopulateSearchParams(params, key, value);
    }
    return params;
  }

  private static PopulateObject<T extends { [key: string]: any }>(params: HttpParams, prefix: string, val: T) {
    const objectKeys = Object.keys(val);

    for (let objKey of objectKeys) {
      let value = val[objKey];
      let key = prefix ? prefix + '[' + objKey + ']' : objKey;

      params = QueryStringBuilder.PopulateSearchParams(params, key, value);
    }

    return params;
  }

  private static PopulateSearchParams<T>(params: HttpParams, key: string, val: T) {
    if (val == null) {
      return params;
    }

    if (val instanceof Array) {
      params = QueryStringBuilder.PopulateArray(params, key, val);
    } else if (val instanceof Date) {
      params = params.set(key, val.toISOString());
    } else if (val instanceof Object) {
      params = QueryStringBuilder.PopulateObject(params, key, val);
    } else {
      const any = (val as any);
      if (typeof any.toString === 'function') {
        {
          const value = any.toString();
          if (value)
            params = params.set(key, any.toString());
        }
      }
    }

    return params;
  }
}
