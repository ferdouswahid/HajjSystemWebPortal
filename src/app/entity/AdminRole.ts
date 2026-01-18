import { prop } from "@rxweb/reactive-form-validators";
import { AuditLog } from "./AuditLog";
import { Admin } from "./Admin";
import { Role } from "./Role";

export class AdminRole extends AuditLog {

    @prop() id: string | null = null;
    
    // @Many to one
    @prop() admin: Admin | null = null;
    @prop() adminId: string | null = null;

    // @Many to one
    @prop() role: Role | null = null;
    @prop() roleId: string | null = null;

    constructor(o?: Partial<AdminRole>) {
        super();
        Object.assign(this, o);
    }
}