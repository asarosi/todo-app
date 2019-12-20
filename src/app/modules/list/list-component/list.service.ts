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
    return new Item(title, deadline);
  }

  getListItemStyle(deadline: Moment, isCompleted: boolean = false) {
    let style = 'notification ';

    if (isCompleted) {
      return style + 'is-completed is-light';
    }

    const remainingDays = deadline.diff(this.currentDate, 'days');

    if (remainingDays >= 1) {
      style += 'is-success';
    } else if (remainingDays >= 0) {
      style += 'is-warning';
    } else {
      style += 'is-danger';
    }

    return style;
  }

  remove(list: Item[], id: string) {
    return list.filter((item) => {
      return item.id !== id;
    });
  }

  addPendingUpdates(item: Item, value: Moment) {
    if (value) {
      item.updates.deadline = value;
    }
  }

  removePendingUpdates(item: Item) {
    if (item.updates.deadline) {
      delete item.updates.deadline;
    }
    item.isEditing = false;
  }

  applyPendingUpdates(item: Item) {
    if (item.updates.deadline) {
      item.deadline = item.updates.deadline;
      this.removePendingUpdates(item);
    } else {
      item.isEditing = false;
    }
  }
}
