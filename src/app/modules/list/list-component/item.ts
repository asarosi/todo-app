import { Moment } from 'moment';
import uuid from 'uuid';

export class Item {
  constructor(public title: string,
              public deadline: Moment,
              public id: string = uuid.v4(),
              public isCompleted: boolean = false,
              public isEditing: boolean = false,
              public updates: Item = {} as Item) {
  }
}
