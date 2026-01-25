import { prop, required, minNumber } from '@rxweb/reactive-form-validators';

export class VehicleContractUpdateModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  vehicleId: number | null = null;

  @prop()
  contractId: number | null = null;

  @prop() @required() @minNumber({ value: 1 })
  agreedSeat: number | null = null;

  @prop() @required()
  companyId: number | null = null;

  constructor(o?: Partial<VehicleContractUpdateModel>) {
    Object.assign(this, o);
  }
}
