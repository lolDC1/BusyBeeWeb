import {UserPortfolioModel} from "./user-portfolio.model";
import {Genders} from "../../enums/genders.enum";

export interface UserModel {
  id: string,
  name: string,
  surname: string,
  cityId?: string,
  cityName?: string,
  birthday?: string,
  gender?: Genders,
  aboutMyself?: string,
  phone?: string,
  contactEmail?: string,
  photoFilename?: string,
  videoLink?: string,
  portfolioFiles: UserPortfolioModel[],
  orderCategories: string[],
  orderCities: string[],
}
