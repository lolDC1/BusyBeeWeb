import {DataTemplateItemResponse} from "./data-template-item/data-template-item-response.model";

export interface DataTemplateModel {
  id: string,
  estimatedCost: number,
  dataTemplateItems: DataTemplateItemResponse[]
}
