import {Genders} from "../../enums/genders.enum";

export interface UserCommandModel {
  name: string,
  surname: string,
  cityId?: string,
  birthday?: string,
  gender?: Genders,
  aboutMyself?: string,
  phone?: string,
  contactEmail?: string,
  videoLink?: string,
}
