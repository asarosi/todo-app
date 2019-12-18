import { Injectable } from '@angular/core';
import { Item } from './item';
import uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() {
  }

  createListItem(title: string, deadline: Date) {
    return new Item(uuid.v4(), title, deadline);
  }
}
