import { prop } from '@rxweb/reactive-form-validators';

export class PackageSearchModel {
  @prop()
  id: number | null = null;

  @prop()
  ids: number[] | null = null;

  @prop()
  packageTypeId: number | null = null;

  @prop()
  companyId: number | null = null;

  @prop()
  seasonId: number | null = null;

  @prop()
  title: string | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop()
  startDate: string | null = null;

  @prop()
  endDate: string | null = null;

  constructor(o?: Partial<PackageSearchModel>) {
    Object.assign(this, o);
  }
}
