import { Injectable } from '@angular/core';
import { Item } from './item';
import { Moment } from 'moment';
import { HelperService } from '../../helpers/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly currentDate;

  constructor(private helperService: HelperService) {
    this.currentDate = helperService.getTodayDate();
  }

  createListItem(title: string, deadline: Moment) {
    return new Item(null, title, deadline);
  }

  getListItemStyle(deadline: Moment) {
    const remainingDays = deadline.diff(this.currentDate, 'days');

    let style = 'notification ';

    if (remainingDays >= 1) {
      style += 'is-success';
    } else if (remainingDays >= 0) {
      style += 'is-warning';
    } else {
      style += 'is-danger';
    }

    return style;
  }
}
