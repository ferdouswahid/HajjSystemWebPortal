import { prop, required } from '@rxweb/reactive-form-validators';

export class VehicleContractModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  vehicleId: number | null = null;

  @prop()
  vehicle: any | null = null;

  @prop() @required()
  startDate: string | null = null;

  @prop() @required()
  endDate: string | null = null;

  @prop() @required()
  agreedSeat: number | null = null;

  @prop() @required()
  serviceConditions: string | null = null;

  @prop() @required()
  status: string | null = null;

  @prop() @required()
  price: number | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<VehicleContractModel>) {
    Object.assign(this, o);
  }
}
