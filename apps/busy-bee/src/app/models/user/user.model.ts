import { UserPortfolioModel } from './user-portfolio.model';
import { Genders } from '../../enums/genders.enum';

export interface UserModel {
  id: string;
  name: string;
  surname: string;
  cityId?: string;
  birthday?: string;
  gender?: Genders;
  aboutMyself?: string;
  phone?: string;
  photoFilename?: string;
  videoLink?: string;
  portfolioFiles: UserPortfolioModel[];
}
