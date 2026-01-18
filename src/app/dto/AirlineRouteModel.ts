import { prop, required } from '@rxweb/reactive-form-validators';

export class AirlineRouteModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  iata: string | null = null;

  @prop()
  lat: string | null = null;

  @prop()
  lon: string | null = null;

  @prop()
  iso: string | null = null;

  @prop()
  status: boolean | null = null;

  @prop()
  name: string | null = null;

  @prop()
  continent: string | null = null;

  @prop()
  type: string | null = null;

  @prop()
  size: string | null = null;

  constructor(o?: Partial<AirlineRouteModel>) {
    Object.assign(this, o);
  }
}
