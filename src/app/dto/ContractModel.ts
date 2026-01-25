import { prop, required, propArray } from '@rxweb/reactive-form-validators';
import { VehicleContractModel } from './VehicleContractModel';
import { ContractType } from '../enum/ContractType';
import { VendorModel } from './VendorModel';
import { CompanyModel } from './CompanyModel';
import { SeasonModel } from './SeasonModel';

export class ContractModel {
  @prop()
  id: number | null = null;

  @prop()
  title: number | null = null;

  @prop() @required()
  vendorId: number | null = null;

  @prop() @required()
  contractType: ContractType | null = null;

  // DateOnly on backend -> use ISO date string on frontend (YYYY-MM-DD)
  @prop()
  startDate: string | null = null;

  @prop()
  endDate: string | null = null;

  @prop()
  status: string | null = null;

  @prop()
  serviceConditions: string | null = null;

  @prop()
  companyId: number | null = null;

  @prop() @required()
  seasonId: number | null = null;

  @prop()
  vendor: VendorModel | null = null;

  @prop()
  company: CompanyModel | null = null;

  @prop()
  season: SeasonModel | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  @propArray(VehicleContractModel)
  vehicleContracts: VehicleContractModel[] = [];

  constructor(o?: Partial<ContractModel>) {
    Object.assign(this, o);
  }
}
