import { prop, required } from '@rxweb/reactive-form-validators';
import { CompanyModel } from './CompanyModel';

export class PackageTypeModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  name: string | null = null;

  @prop()
  detail: string | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<PackageTypeModel>) {
    Object.assign(this, o);
  }
}
