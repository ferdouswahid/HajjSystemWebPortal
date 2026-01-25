import { prop, required, propArray } from '@rxweb/reactive-form-validators';
import { ContractType } from '../enum/ContractType';
import {VehicleContractUpdateModel} from './VehicleContractUpdateModel';

export class ContractUpdateModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  title: number | null = null;

  @prop() @required()
  vendorId: number | null = null;

  @prop() @required()
  contractType: ContractType | null = null; // replace with ContractType enum if available

  // DateOnly on backend -> use ISO date string on frontend
  @prop()
  startDate: string | null = null;

  @prop()
  endDate: string | null = null;

  @prop()
  status: string | null = null;

  @prop()
  serviceConditions: string | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop() @required()
  seasonId: number | null = null;

  @propArray(VehicleContractUpdateModel)
  vehicleContracts: VehicleContractUpdateModel[] = [];

  constructor(o?: Partial<ContractUpdateModel>) {
    Object.assign(this, o);
  }
}
