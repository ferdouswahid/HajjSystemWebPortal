import { prop, required, minNumber, propArray } from '@rxweb/reactive-form-validators';
import { VehicleTypeEnum } from '../enum/VehicleTypeEnum';
import {VehicleDetailUpdateModel} from "./VehicleDetailUpdateModel";

export class VehicleUpdateModel {
    @prop()
    id: number | null = null;

    @prop()
    engineNumber: string | null = null;

    @prop()
    chassisNumber: string | null = null;

    @prop()
    color: string | null = null;

    @prop() @required()
    model: string | null = null;

    @prop() @required()
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

    @prop() @required()
    companyId: number | null = null;

    @prop() @required()
    vendorId: number | null = null;

    @prop()
    createdDate: Date | string | null = null;

    @prop()
    updatedDate: Date | string | null = null;

    @prop()
    isEnabled: boolean = true;

    @propArray(VehicleDetailUpdateModel)
    vehicleDetails: VehicleDetailUpdateModel[] = [];

    constructor(o?: Partial<VehicleUpdateModel>) {
        Object.assign(this, o);
    }
}
