import { prop, required, minNumber } from '@rxweb/reactive-form-validators';

export class OrderDetailUpdateModel {
  @prop()
  id: number | null = null;

  @prop()
  orderId: number | null = null;

  @prop() @required()
  packageId: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  price: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  discount: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  netPrice: number | null = null;

  @prop()
  fullName: string | null = null;

  @prop()
  country: string | null = null;

  @prop()
  mobileNo: string | null = null;

  @prop()
  email: string | null = null;

  @prop()
  passportNo: string | null = null;

  constructor(o?: Partial<OrderDetailUpdateModel>) {
    Object.assign(this, o);
  }
}
