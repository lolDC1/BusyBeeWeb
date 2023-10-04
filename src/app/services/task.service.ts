import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntityApiDataProvider} from "./data-providers-base/entity-api-data-provider";
import {ApiQueryParameters} from "../models/base/api/api-query-parameters";
import {TaskCreateCommandModel} from "../models/task/task-create-command.model";
import {TaskUpdateCommandModel} from "../models/task/task-update-command.model";
import {TaskModel} from "../models/task/task.model";
import {TaskFilter} from "../models/task/task.filter";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaskService extends EntityApiDataProvider<TaskCreateCommandModel, TaskUpdateCommandModel,
  TaskModel, TaskModel, string, ApiQueryParameters<TaskFilter>> {
  controllerPath = 'tasks';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  override getById(id: string): Observable<TaskModel> {
    return this.httpClient.get<TaskModel>(this.baseEntityUrl + id);
  }

  closeTask(taskId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.baseEntityUrl}/portfolio/${taskId}`, taskId);
  }

  assignTask(taskId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.baseEntityUrl}/assign/${taskId}`, taskId);

  }

  deAssignTask(taskId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.baseEntityUrl}/deassign/${taskId}`, taskId);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseEntityUrl}/${taskId}`);
  }

  getAll(): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.baseEntityUrl);
  }
}
