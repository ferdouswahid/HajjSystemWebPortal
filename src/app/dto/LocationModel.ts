import { prop, required } from '@rxweb/reactive-form-validators';

export class LocationModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  name: string | null = null;

  @prop() @required()
  type: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<LocationModel>) {
    Object.assign(this, o);
  }
}
