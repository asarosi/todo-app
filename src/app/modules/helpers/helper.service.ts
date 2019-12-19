import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
  }

  getTodayDate() {
    return moment().startOf('day');
  }
}
