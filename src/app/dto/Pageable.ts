export class Pageable {

  pageNumber: number = 0;

  pageSize: number = 0;

  constructor(o?: Partial<Pageable>) {
    Object.assign(this, o);
  }
}
