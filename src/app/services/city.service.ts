import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListItem} from "../models/base/list-item";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly baseUrl: string;
  controllerPath = 'cities';

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.endpoint;
  }

  protected get baseEntityUrl() {
    return this.baseUrl + this.controllerPath;
  }

  autocomplete() {
    return this.httpClient.get<ListItem[]>(this.baseEntityUrl + '/autocomplete-all');
  }
}
