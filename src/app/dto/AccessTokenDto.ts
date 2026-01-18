import { prop, } from '@rxweb/reactive-form-validators';


export class AccessTokenDto  {

  @prop() accessToken: string | null = null;

  constructor(o?: Partial<AccessTokenDto>) {
    Object.assign(this, o);
  }
}