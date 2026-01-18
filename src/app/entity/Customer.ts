import { prop, propArray } from '@rxweb/reactive-form-validators';
import { AuditLog } from './AuditLog';
import { Country } from './Country';

export class Customer extends AuditLog {

  @prop() id: string | null = null;
  @prop() firstName: string | null = null;
  @prop() middleName: string | null = null;
  @prop() lastName: string | null = null;
  @prop() email: string | null = null;
  @prop() countryCode: string | null = null;
  @prop() mobile: string | null = null;
  @prop() gender: string | null = null;
  @prop() birthDate: string | null = null;
  @prop() address: string | null = null;

  @prop()
  country: Country | null = null;
  @prop()
  countryId: string | null = null;


  constructor(o?: Partial<Customer>) {
    super();
    Object.assign(this, o);
  }
}
