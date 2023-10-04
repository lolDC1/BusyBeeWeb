import {TaskStringDataValueResponse} from "./task-data/task-string-data-value-response.model";
import {TaskSelectionDataValueResponse} from "./task-data/task-selection-data-value-response.model";
import {TaskTimes} from "../../enums/task-times.enum";

export interface TaskCreateCommandModel {
  title: string,
  description?: string,
  confidentialInfo?: string,
  categoryId: string,
  cityId: string,
  date: string,
  time: TaskTimes,
  cost: number,
  strings: TaskStringDataValueResponse[],
  selections: TaskSelectionDataValueResponse[]
}

