import { prop } from '@rxweb/reactive-form-validators';
import { ContractType } from '../enum/ContractType';

export class ContractSearchModel {
  @prop()
  id: number | null = null;

  @prop()
  ids: number[] | null = null;

  @prop()
  vendorId: number | null = null;

  @prop()
  contractType: ContractType | null = null;

  // DateOnly on backend -> use ISO date string on frontend (YYYY-MM-DD)
  @prop()
  startDate: string | null = null;

  @prop()
  endDate: string | null = null;

  @prop()
  status: string | null = null;

  @prop()
  companyId: number | null = null;

  @prop()
  seasonId: number | null = null;

  constructor(o?: Partial<ContractSearchModel>) {
    Object.assign(this, o);
  }
}
