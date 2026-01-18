import {prop, propArray} from "@rxweb/reactive-form-validators";

export class SearchDto {

  @prop() page: number = 0;
  @prop() size: number = 10;
  @prop() multiSearchProp: string | null = null;

  constructor(o?: Partial<SearchDto>) {
    Object.assign(this, o);
  }
}
