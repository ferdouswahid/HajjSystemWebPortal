import { prop, required } from '@rxweb/reactive-form-validators';

export class VehicleRouteModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  name: string | null = null;

  @prop()
  details: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<VehicleRouteModel>) {
    Object.assign(this, o);
  }
}
