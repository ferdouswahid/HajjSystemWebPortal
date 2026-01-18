import { Pageable } from "./Pageable";

export class Page<T> {

  content: Array<T> = [];

  pageable: Pageable  = new Pageable();

  totalPages: number = 0;      // total item / number of item per page

  totalElements: number = 0;   // total number of item

  size: number = 0;            // number of item per page

  numberOfElements: number = 0;  // number of item per page

  first: boolean = false;

  last: boolean = false;

  constructor(o?: Partial<Page<T>>) {
    Object.assign(this, o);
  }
}