import {prop, required} from '@rxweb/reactive-form-validators';
import { OrderStatus } from '../enum/OrderStatus';

export class OrderSearchModel {
  @prop()
  id: number | null = null;

  @prop()
  ids: number[] | null = null;

  @prop()
  userId: number | null = null;

  @prop()
  pilgrimCompanyId: number | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  invoiceNo: string | null = null;

  @prop()
  status: OrderStatus | null = null;

  // DateTime on backend -> use ISO datetime string on frontend
  @prop()
  startDate: string | null = null;

  @prop()
  endDate: string | null = null;

  constructor(o?: Partial<OrderSearchModel>) {
    Object.assign(this, o);
  }
}
