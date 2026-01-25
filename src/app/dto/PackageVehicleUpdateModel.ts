import { prop, required, minNumber } from '@rxweb/reactive-form-validators';

export class PackageVehicleUpdateModel {
  @prop()
  id: number | null = null;

  @prop()
  packageId: number | null = null;

  @prop() @required()
  contractId: number | null = null;

  @prop() @required()
  seasonId: number | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  vehicleDetailId: number | null = null;

  @prop() @required()
  vehicleContractId: number | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop() @required()
  startDate: string | null = null;

  @prop() @required()
  endDate: string | null = null;

  @prop() @required() @minNumber({ value: 0 })
  cost: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  price: number | null = null;

  constructor(o?: Partial<PackageVehicleUpdateModel>) {
    Object.assign(this, o);
  }
}
