import { prop } from '@rxweb/reactive-form-validators';

export class UserSearchModel {
  @prop()
  id: number | null = null;

  @prop()
  ids: number[] | null = null;

  @prop()
  username: string | null = null;

  @prop()
  email: string | null = null;

  @prop()
  firstName: string | null = null;

  @prop()
  lastName: string | null = null;

  @prop()
  userType: string | null = null;

  @prop()
  companyId: number | null = null;

  @prop()
  seasonId: number | null = null;

  @prop()
  mobile: string | null = null;

  @prop()
  city: string | null = null;

  @prop()
  country: string | null = null;

  constructor(o?: Partial<UserSearchModel>) {
    Object.assign(this, o);
  }
}
