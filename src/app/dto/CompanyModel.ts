import { prop, required } from '@rxweb/reactive-form-validators';

export class CompanyModel {
  @prop()
  id: number | null = null;

  @prop() @required()
  companyName: string | null = null;

  @prop()
  companyNameAr: string | null = null;

  @prop() @required()
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
  createdDate: string | null = null;

  @prop()
  updatedDate: string | null = null;

  @prop()
  isEnabled: boolean = true;

  constructor(o?: Partial<CompanyModel>) {
    Object.assign(this, o);
  }
}
