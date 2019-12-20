import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
  }

  getTodayDate(): moment.Moment {
    return moment().startOf('day');
  }
}
