import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ListService } from './list.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  items: Item[];

  constructor(private listService: ListService) {
    this.items = [];
    this.items.push(listService.createListItem());
  }

  ngOnInit() {
  }

}
