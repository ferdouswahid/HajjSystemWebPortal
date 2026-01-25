import { prop } from '@rxweb/reactive-form-validators';
import { TripTypeEnum } from '../enum/TripTypeEnum';
import { CompanyModel } from './CompanyModel';
import { VehicleModel } from './VehicleModel';
import { VehicleRouteModel } from './VehicleRouteModel';

export class VehicleDetailModel {
  @prop()
  id: number | null = null;

  @prop()
  vehicleId: number | null = null;

  @prop()
  routeFromId: number | null = null;

  @prop()
  routeToId: number | null = null;

  @prop()
  tripType: TripTypeEnum | null = null;

  @prop()
  price: number | null = null;

  @prop()
  departureDate: Date | string | null = null;

  @prop()
  arrivalDate: Date | string | null = null;

  @prop()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

  @prop()
  vehicle: VehicleModel | null = null;

  @prop()
  routeFrom: VehicleRouteModel | null = null;

  @prop()
  routeTo: VehicleRouteModel | null = null;

  constructor(o?: Partial<VehicleDetailModel>) {
    Object.assign(this, o);
  }
}
