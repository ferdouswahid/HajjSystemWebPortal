import { prop, required, propArray, minNumber } from '@rxweb/reactive-form-validators';
import { CompanyModel } from './CompanyModel';
import { SeasonModel } from './SeasonModel';
import { PackageTypeModel } from './PackageTypeModel';
import { PackageVehicleModel } from './PackageVehicleModel';

export class PackageModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  title: string | null = null;

  @prop() @required()
  packageTypeId: number | null = null;

  @prop()
  packageType: PackageTypeModel | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalCost: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalPrice: number | null = null;

  @prop() @minNumber({ value: 0 })
  discount: number = 0;

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

  @prop()
  company: CompanyModel | null = null;

  @prop() @required()
  seasonId: number | null = null;

  @prop()
  season: SeasonModel | null = null;

  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  @propArray(PackageVehicleModel)
  packageVehicles: PackageVehicleModel[] = [];

  constructor(o?: Partial<PackageModel>) {
    Object.assign(this, o);
  }
}
