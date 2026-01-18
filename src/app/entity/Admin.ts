import { prop, propArray, } from '@rxweb/reactive-form-validators';
import { AuditLog } from "./AuditLog";
import { AdminRole } from './AdminRole';

export class Admin extends AuditLog {

  @prop() id: string | null = null;
  @prop() name: string | null = null;
  @prop() username: string | null = null;
  @prop() password: string | null = null;

  //@One to many 
  @propArray(AdminRole, { createBlank: false })
  adminRoleList: Array<AdminRole> = [];

  constructor(o?: Partial<Admin>) {
    super();
    Object.assign(this, o);
  }
}
