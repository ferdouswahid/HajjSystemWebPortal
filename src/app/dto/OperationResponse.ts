export class OperationResponse<T> {
  data:  T;
  status: boolean = false;
  message: string | null = null;

  constructor(o?: Partial<OperationResponse<T>>) {
    Object.assign(this, o);
  }
}
