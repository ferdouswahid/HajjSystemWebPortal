import { prop, required, minNumber } from '@rxweb/reactive-form-validators';
import { OrderModel } from './OrderModel';
import { PackageModel } from './PackageModel';

export class OrderDetailModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  orderId: number | null = null;

  @prop()
  order: OrderModel | null = null;

  @prop() @required()
  packageId: number | null = null;

  @prop()
  package: PackageModel | null = null;

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

  // DateTime on backend -> use ISO datetime string on frontend
  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<OrderDetailModel>) {
    Object.assign(this, o);
  }
}
