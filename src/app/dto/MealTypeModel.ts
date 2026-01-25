import { prop, required } from '@rxweb/reactive-form-validators';

export class MealTypeModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  name: string | null = null;

  @prop()
  detail: string | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<MealTypeModel>) {
    Object.assign(this, o);
  }
}
