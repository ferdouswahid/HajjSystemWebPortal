import { prop, required, propArray, minNumber } from '@rxweb/reactive-form-validators';
import { OrderStatus } from '../enum/OrderStatus';
import { CompanyModel } from './CompanyModel';
import { OrderDetailModel } from './OrderDetailModel';

export class OrderModel {
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

  @prop() @required()
  userId: number | null = null;

  @prop()
  user: any | null = null; // TODO: Replace with UserModel when available

  @prop() @required()
  pilgrimCompanyId: number | null = null;

  @prop()
  pilgrimCompany: CompanyModel | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

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

  @prop()
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  @propArray(OrderDetailModel)
  orderDetails: OrderDetailModel[] = [];

  constructor(o?: Partial<OrderModel>) {
    Object.assign(this, o);
  }
}
