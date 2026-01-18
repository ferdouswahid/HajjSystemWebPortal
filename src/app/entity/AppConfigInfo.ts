import { prop } from "@rxweb/reactive-form-validators";
import { AuditLog } from "./AuditLog";

export class AppConfigInfo extends AuditLog {

    @prop() id: number | null = null;
    @prop() name: string | null = null;

    constructor(o?: Partial<AppConfigInfo>) {
        super();
        Object.assign(this, o);
    }
}