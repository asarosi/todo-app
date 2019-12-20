import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { HelperService } from '../../helpers/helper.service';
import { Item } from './item';

describe('ListService', () => {
  let listService: ListService;
  let helperService: HelperService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ListService, HelperService]
  }));

  it('should be created', () => {
    const service: ListService = TestBed.get(ListService);
    expect(service).toBeTruthy();
  });

  it('should return warning class', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);
    const today = helperService.getTodayDate();
    const style = listService.getListItemStyle(today);

    expect(style).toBe('notification is-warning');
  });

  it('should return danger class', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);
    const yesterday = helperService.getTodayDate().subtract(1, 'day');
    const style = listService.getListItemStyle(yesterday);

    expect(style).toBe('notification is-danger');
  });

  it('should return success class', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);
    const tomorrow = helperService.getTodayDate().add(1, 'day');
    const style = listService.getListItemStyle(tomorrow);

    expect(style).toBe('notification is-success');
  });

  it('should return completed class', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);
    const today = helperService.getTodayDate();
    const style = listService.getListItemStyle(today, true);

    expect(style).toBe('notification is-completed is-light');
  });

  it('should remove the item with id "ABC-123" from the list', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);

    const today = helperService.getTodayDate();
    const itemToRemove = new Item('Title A', today, 'ABC-123', false, false);
    let items = [];

    items.push(itemToRemove);
    items.push(new Item('Title B', today));
    items.push(new Item('Title C', today));

    items = listService.remove(items, itemToRemove.id);

    expect(items).not.toContain(itemToRemove);
  });

  it('should add pending updates to the selected item', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);

    const today = helperService.getTodayDate();
    const item = new Item('Title A', today, 'ABC-123');

    listService.addPendingUpdates(item, today);

    // @ts-ignore
    expect(item).toEqual(jasmine.objectContaining({
      _u: {
        deadline: today
      }
    }));
  });

  it('should remove pending updates to the selected item', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);

    const today = helperService.getTodayDate();
    const item = new Item('Title A', today, 'ABC-123');

    // @ts-ignore
    item._u = {};
    // @ts-ignore
    item._u.deadline = today;

    listService.removePendingUpdates(item);

    // @ts-ignore
    expect(item).not.toEqual(jasmine.objectContaining({
      _u: {
        deadline: today
      }
    }));
  });

  it('should apply pending updates to the selected item', () => {
    listService = TestBed.get(ListService);
    helperService = TestBed.get(HelperService);

    const today = helperService.getTodayDate();
    const tomorrow = today.add(1, 'day');
    const item = new Item('Title A', today, 'ABC-123');

    // @ts-ignore
    item._u = {};
    // @ts-ignore
    item._u.deadline = tomorrow;

    listService.removePendingUpdates(item);

    expect(item.deadline).toEqual(tomorrow);

    // @ts-ignore
    expect(item).not.toEqual(jasmine.objectContaining({
      _u: {
        deadline: today
      }
    }));
  });
});
