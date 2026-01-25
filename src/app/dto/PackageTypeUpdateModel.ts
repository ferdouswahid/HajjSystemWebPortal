import { prop, required } from '@rxweb/reactive-form-validators';

export class PackageTypeUpdateModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  name: string | null = null;

  @prop()
  detail: string | null = null;

  @prop() @required()
  companyId: number | null = null;

  constructor(o?: Partial<PackageTypeUpdateModel>) {
    Object.assign(this, o);
  }
}
