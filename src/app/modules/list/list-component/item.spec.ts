import { Item } from './item';
import * as moment from 'moment';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Item('test', moment())).toBeTruthy();
  });
});
