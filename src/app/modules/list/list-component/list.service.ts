import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {
  }

  createListItem() {
    return new Item(1, 'I should go to the local market to buy some vegetables and milk', new Date());
  }
}
