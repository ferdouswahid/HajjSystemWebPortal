import { prop } from '@rxweb/reactive-form-validators';
import { CompanyModel } from './CompanyModel';
import { SeasonModel } from './SeasonModel';

export class UserModel {
  @prop()
  id: number | null = null;

  @prop()
  firstName: string | null = null;

  @prop()
  middleName: string | null = null;

  @prop()
  lastName: string | null = null;

  @prop()
  username: string | null = null;

  @prop()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

  @prop()
  userType: string | null = null;

  @prop()
  address: string = '';

  @prop()
  city: string = '';

  @prop()
  country: string = '';

  @prop()
  passport: string = '';

  @prop()
  passportValidity: string | null = null;

  @prop()
  mobile: string = '';

  @prop()
  email: string | null = null;

  @prop()
  seasonId: number | null = null;

  @prop()
  season: SeasonModel | null = null;

  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<UserModel>) {
    Object.assign(this, o);
  }
}
