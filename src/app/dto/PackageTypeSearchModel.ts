import { prop } from '@rxweb/reactive-form-validators';

export class PackageTypeSearchModel {
  @prop()
  id: number | null = null;

  @prop()
  ids: number[] | null = null;

  @prop()
  name: string | null = null;

  @prop()
  companyId: number | null = null;

  constructor(o?: Partial<PackageTypeSearchModel>) {
    Object.assign(this, o);
  }
}
