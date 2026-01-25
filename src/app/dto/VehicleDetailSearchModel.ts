import { prop } from '@rxweb/reactive-form-validators';
import { TripTypeEnum } from '../enum/TripTypeEnum';

export class VehicleDetailSearchModel {
  @prop()
  id: number | null = null;

  @prop()
  ids: number[] | null = null;

  @prop()
  vehicleId: number | null = null;

  @prop()
  routeFromId: number | null = null;

  @prop()
  routeToId: number | null = null;

  @prop()
  tripType: TripTypeEnum | null = null;

  @prop()
  minPrice: number | null = null;

  @prop()
  maxPrice: number | null = null;

  @prop()
  departureDate: string | null = null;

  @prop()
  companyId: number | null = null;

  constructor(o?: Partial<VehicleDetailSearchModel>) {
    Object.assign(this, o);
  }
}
