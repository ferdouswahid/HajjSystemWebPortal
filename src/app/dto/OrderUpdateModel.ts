import { prop, required, propArray, minNumber } from '@rxweb/reactive-form-validators';
import { OrderStatus } from '../enum/OrderStatus';
import { OrderDetailUpdateModel } from './OrderDetailUpdateModel';

export class OrderUpdateModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  invoiceNo: string | null = null;

  @prop() @required()
  fullName: string | null = null;

  @prop()
  country: string | null = null;

  @prop()
  mobileNo: string | null = null;

  @prop()
  email: string | null = null;

  @prop()
  userId: number | null = null;

  @prop()
  pilgrimCompanyId: number | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalAmount: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalDiscount: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  totalNetAmount: number | null = null;

  @prop() @required() @minNumber({ value: 0 })
  paid: number | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop() @required()
  date: string | null = null;

  @prop() @required()
  status: OrderStatus | null = null;

  @propArray(OrderDetailUpdateModel)
  orderDetails: OrderDetailUpdateModel[] = [];

  constructor(o?: Partial<OrderUpdateModel>) {
    Object.assign(this, o);
  }
}
