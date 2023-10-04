import {DataTemplateType} from "../../../enums/data-template-type.enum";
import {DataTemplateItemValueResponse} from "./data-template-item-value-response.model";

export interface DataTemplateItemResponse {
  id: string,
  title?: string,
  type: DataTemplateType,
  selection?: DataTemplateItemValueResponse[]
}
