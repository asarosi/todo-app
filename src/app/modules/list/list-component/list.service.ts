import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {
  }

  createListItem() {
    return new Item(1, 'tite', new Date());
  }
}
