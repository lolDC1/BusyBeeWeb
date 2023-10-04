import {TaskStringDataValueResponse} from "./task-data/task-string-data-value-response.model";
import {TaskSelectionDataValueResponse} from "./task-data/task-selection-data-value-response.model";
import {TaskStatuses} from "../../enums/task-statuses.enum";
import {TaskTimes} from "../../enums/task-times.enum";

export interface TaskModel {
  id: string,
  title: string,
  description?: string,
  confidentialInfo?: string,
  status: TaskStatuses,
  categoryId: string,
  cityId: string,
  createdBy: string,
  assignToId?: string,
  date: string,
  time: TaskTimes,
  cost: number,
  strings: TaskStringDataValueResponse[],
  selections: TaskSelectionDataValueResponse[]
}
