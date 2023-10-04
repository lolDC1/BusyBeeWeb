import { TaskTimes } from '../../enums/task-times.enum';
import { TaskStringDataValueResponse } from './task-data/task-string-data-value-response.model';
import { TaskSelectionDataValueResponse } from './task-data/task-selection-data-value-response.model';

export interface TaskUpdateCommandModel {
  title: string;
  description?: string;
  confidentialInfo?: string;
  cityId: string;
  date: string;
  time: TaskTimes;
  cost: number;
  strings: TaskStringDataValueResponse[];
  selections: TaskSelectionDataValueResponse[];
}
