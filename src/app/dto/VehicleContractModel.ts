import { prop, required } from '@rxweb/reactive-form-validators';
import { VehicleModel } from './VehicleModel';
import { ContractModel } from './ContractModel';
import { CompanyModel } from './CompanyModel';

export class VehicleContractModel {
  @prop()
  id: number | null = null;

  @prop()
  vehicleId: number | null = null;

  @prop()
  vehicle: VehicleModel | null = null;

  @prop()
  contractId: number | null = null;

  @prop()
  contract: ContractModel | null = null;

  @prop()
  agreedSeat: number | null = null;

  @prop()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

  constructor(o?: Partial<VehicleContractModel>) {
    Object.assign(this, o);
  }
}
