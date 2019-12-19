import { Moment } from 'moment';
import uuid from 'uuid';

export class Item {
  constructor(public id: string, public title: string, public deadline: Moment) {
    this.id = id ? id : uuid.v4();
  }
}
