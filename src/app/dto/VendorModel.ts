import { prop, required } from '@rxweb/reactive-form-validators';
import {CompanyModel} from "./CompanyModel";

export class VendorModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  name: string | null = null;

  @prop()
  nameAr: string | null = null;

  @prop() @required()
  type: string | null = null;

  @prop()
  crNumber: string | null = null;

  @prop()
  address: string | null = null;

  @prop()
  mobile: string | null = null;

  @prop()
  vatRegNumber: string | null = null;

  @prop()
  buildingNumber: string | null = null;

  @prop()
  district: string | null = null;

  @prop()
  city: string | null = null;

  @prop()
  country: string | null = null;

  @prop()
  postalCode: string | null = null;

  @prop()
  email: string | null = null;

  @prop()
  phone: string | null = null;

  @prop()
  status: string | null = null;

  @prop() @required()
  companyId: number | null = null;

  @prop()
  company: CompanyModel | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<VendorModel>) {
    Object.assign(this, o);
  }
}
