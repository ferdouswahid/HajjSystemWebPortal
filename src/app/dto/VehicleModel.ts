import { prop, required, minNumber, propArray } from '@rxweb/reactive-form-validators';
import { VehicleTypeEnum } from '../enum/VehicleTypeEnum';
import { CompanyModel } from './CompanyModel';
import { VendorModel } from './VendorModel';
import {VehicleDetailModel} from "./VehicleDetailModel";

export class VehicleModel {
    @prop()
    id: number | null = null;

    @prop()
    engineNumber: string | null = null;

    @prop()
    chassisNumber: string | null = null;

    @prop()
    color: string | null = null;

    @prop()
    model: string | null = null;

    @prop()
    year: number | null = null;

    @prop() @required()
    licensePlate: string | null = null;

    @prop() @required()
    vehicleType: VehicleTypeEnum | null = null;

    @prop() @required() @minNumber({ value: 1 })
    totalSeat: number | null = null;

    @prop()
    features: string | null = null;

    @prop()
    status: string | null = null;

    @prop()
    companyId: number | null = null;

    @prop()
    company: CompanyModel | null = null;

    @prop()
    vendorId: number | null = null;

    @prop()
    vendor: VendorModel | null = null;

    @prop()
    createdDate: Date | string | null = null;

    @prop()
    updatedDate: Date | string | null = null;

    @prop()
    isEnabled: boolean = true;

    @propArray(VehicleDetailModel)
    vehicleDetails: VehicleDetailModel[] = [];

    constructor(o?: Partial<VehicleModel>) {
        Object.assign(this, o);
    }
}
