import { prop, required, minNumber } from '@rxweb/reactive-form-validators';
import { PackageModel } from './PackageModel';
import { ContractModel } from './ContractModel';
import { SeasonModel } from './SeasonModel';
import { CompanyModel } from './CompanyModel';
import { VehicleDetailModel } from './VehicleDetailModel';
import {VehicleContractModel} from "./VehicleContractModel";

export class PackageVehicleModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  packageId: number | null = null;

  @prop()
  package: PackageModel | null = null;

  @prop() @required()
  contractId: number | null = null;

  @prop()
  contract: ContractModel | null = null;

  @prop() @required()
  seasonId: number | null = null;

  @prop()
  season: SeasonModel | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

  @prop()
  vehicleContractId: number | null = null;

  @prop()
  vehicleContract: VehicleContractModel | null = null;

  @prop()
  vehicleDetailId: number | null = null;

  @prop()
  vehicleDetail: VehicleDetailModel | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop() @required()
  startDate: string | null = null;

  @prop() @required()
  endDate: string | null = null;

  @prop() @required() @minNumber({ value: 0 })
  cost: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  price: number | null = null;

  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<PackageVehicleModel>) {
    Object.assign(this, o);
  }
}
