import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import * as moment from 'moment';

describe('HelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelperService = TestBed.get(HelperService);
    expect(service).toBeTruthy();
  });

  it('should return today"s date', () => {
    const service: HelperService = TestBed.get(HelperService);
    const today = moment().startOf('day');
    expect(service.getTodayDate()).toEqual(today);
  });
});
