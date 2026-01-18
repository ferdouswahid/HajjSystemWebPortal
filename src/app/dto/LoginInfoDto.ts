import {prop, required} from '@rxweb/reactive-form-validators';

export class LoginInfoDto {

  @required()
  @prop() username: string | null = null;
  @required()
  @prop() password: string | null = null;
  @required()
  @prop() seasonId: number | null = null;

  constructor(o?: Partial<LoginInfoDto>) {
    Object.assign(this, o);
  }
}
