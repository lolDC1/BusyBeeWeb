import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityApiDataProvider } from './data-providers-base/entity-api-data-provider';
import { ApiQueryParameters } from '../models/base/api/api-query-parameters';
import { TaskCreateCommandModel } from '../models/task/task-create-command.model';
import { TaskUpdateCommandModel } from '../models/task/task-update-command.model';
import { TaskModel } from '../models/task/task.model';
import { TaskFilter } from '../models/task/task.filter';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends EntityApiDataProvider<
  TaskCreateCommandModel,
  TaskUpdateCommandModel,
  TaskModel,
  TaskModel,
  string,
  ApiQueryParameters<TaskFilter>
> {
  controllerPath = 'tasks';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }
}
