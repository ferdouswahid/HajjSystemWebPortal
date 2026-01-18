import { prop, required, minLength } from '@rxweb/reactive-form-validators';

export class SeasonModel {
  @prop()
  id: number | null = null;
  @prop() @required()
  title: string | null = null;
  @prop() @required()
  startDate: string | null = null;
  @prop() @required()
  endDate: string | null = null;
  @prop()
  isCurrent: boolean = false;

  constructor(o?: Partial<SeasonModel>) {
    Object.assign(this, o);
  }
}
