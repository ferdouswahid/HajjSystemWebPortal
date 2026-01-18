import { prop, propArray, } from '@rxweb/reactive-form-validators';
import { AuditLog } from "./AuditLog";
import { AdminRole } from './AdminRole';


export class Role extends AuditLog {

  @prop() id: string | null = null;
  @prop() name: string | null = null;

  //@One to many 
  @propArray(AdminRole, { createBlank: false })
  adminRoleList: Array<AdminRole> = [];

  constructor(o?: Partial<Role>) {
    super();
    Object.assign(this, o);
  }
}
