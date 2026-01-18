import { prop } from '@rxweb/reactive-form-validators';
import { AuditLog } from './AuditLog';

export class Country extends AuditLog {

  @prop() id: string | null = null;
  @prop() name: string | null = null;
  @prop() shortName: string | null = null;
  @prop() countryCode: string | null = null;
  @prop() region: string | null = null;

  constructor(o?: Partial<Country>) {
    super();
    Object.assign(this, o);
  }
}