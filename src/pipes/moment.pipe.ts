import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe {
  transform(value: any, args: any) {
    args = args || '';
    return args === 'ago' ? moment(value).fromNow() : moment(value).format(args);
  }
}
