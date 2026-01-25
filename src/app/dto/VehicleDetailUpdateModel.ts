import { prop, required, minNumber } from '@rxweb/reactive-form-validators';
import { TripTypeEnum } from '../enum/TripTypeEnum';

export class VehicleDetailUpdateModel {
    @prop()
    id: number | null = null;

    @prop()
    vehicleId: number | null = null;

    @prop() @required()
    routeFromId: number | null = null;

    @prop() @required()
    routeToId: number | null = null;

    @prop() @required()
    tripType: TripTypeEnum | null = null;

    @prop() @required() @minNumber({ value: 0.01 })
    price: number | null = null;

    @prop() @required()
    departureDate: Date | string | null = null;

    @prop()
    arrivalDate: Date | string | null = null;

    @prop() @required()
    companyId: number | null = null;


    constructor(o?: Partial<VehicleDetailUpdateModel>) {
        Object.assign(this, o);
    }

}
