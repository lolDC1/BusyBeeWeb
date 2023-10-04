import {TaskStatuses} from "../../enums/task-statuses.enum";

export interface TaskFilter {
  status?: TaskStatuses
}
