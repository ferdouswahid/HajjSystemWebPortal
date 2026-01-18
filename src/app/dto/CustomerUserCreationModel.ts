import { prop, required } from '@rxweb/reactive-form-validators';

export class CustomerUserCreationModel {
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
  seasonId: number | null = null;

  constructor(o?: Partial<CustomerUserCreationModel>) {
    Object.assign(this, o);
  }
}
