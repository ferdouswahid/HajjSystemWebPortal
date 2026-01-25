import { prop, required, propArray, minNumber } from '@rxweb/reactive-form-validators';
import { PackageVehicleUpdateModel } from './PackageVehicleUpdateModel';

export class PackageUpdateModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  title: string | null = null;

  @prop() @required()
  packageTypeId: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalCost: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalPrice: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  discount: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  netPrice: number | null = null;

  @prop() @required() @minNumber({ value: 1 })
  totalNoOfNight: number | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop() @required()
  startDate: string | null = null;

  @prop() @required()
  endDate: string | null = null;

  @prop() @required() @minNumber({ value: 1 })
  noOfPilgrim: number | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop() @required()
  seasonId: number | null = null;

  @propArray(PackageVehicleUpdateModel)
  packageVehicles: PackageVehicleUpdateModel[] = [];

  constructor(o?: Partial<PackageUpdateModel>) {
    Object.assign(this, o);
  }
}
