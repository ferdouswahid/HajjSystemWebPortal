import { prop, propArray, } from '@rxweb/reactive-form-validators';
import {SearchDto} from "./SearchDto";

export class CountrySearchDto extends SearchDto{

  @propArray() idList: Array<String> = [];
  @propArray() idNeList: Array<String> = [];

  @prop() name: string | null = null;
  @prop() nameIc: string | null = null;
  @prop() code: string | null = null;
  @prop() codeIc: string | null = null;

  constructor(o?: Partial<CountrySearchDto>) {
    super();
    Object.assign(this, o);
  }
}
