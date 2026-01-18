import { prop, } from '@rxweb/reactive-form-validators';


export class ApiResponse<T> {

  @prop() data: T | null = null;

  @prop() ApiResponseType: string | null = null;

  @prop() userInformErrorType: string | null = null;

  @prop() status: boolean | null = null;

  @prop() message: string | null = null;

  constructor(o?: Partial<ApiResponse<T>>) {
    Object.assign(this, o);
  }
}