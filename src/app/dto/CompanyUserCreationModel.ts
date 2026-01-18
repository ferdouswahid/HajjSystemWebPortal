import { prop, required } from '@rxweb/reactive-form-validators';

export class CompanyUserCreationModel {
  @prop() firstName: string | null = null;

  @prop() middleName: string | null = null;

  @prop() lastName: string | null = null;

  @prop()
  @required()
  username: string | null = null;

  @prop()
  @required()
  password: string | null = null;

  @prop()
  @required()
  email: string | null = null;

  @prop()
  @required()
  companyName: string | null = null;

  @prop()
  @required()
  crNumber: string | null = null;

  @prop()
  @required()
  seasonId: number | null = null;

  constructor(o?: Partial<CompanyUserCreationModel>) {
    Object.assign(this, o);
  }
}
