import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import { HelperService } from '../../helpers/helper.service';

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
});
