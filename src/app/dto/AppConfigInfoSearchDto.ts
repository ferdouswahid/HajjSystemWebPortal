import { prop, propArray, } from '@rxweb/reactive-form-validators';
import { SearchDto } from './SearchDto';

export class AppConfigInfoSearchDto extends SearchDto {

  @propArray() idList: Array<String> = [];

  constructor(o?: Partial<AppConfigInfoSearchDto>) {
    super();
    Object.assign(this, o);
  }
}