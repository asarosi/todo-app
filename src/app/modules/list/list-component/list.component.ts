import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ListService } from './list.service';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HelperService } from '../../helpers/helper.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  public itemForm: FormGroup;
  public items: Item[];
  private inputValidationOptions: AbstractControlOptions = {
    validators: Validators.required,
    updateOn: 'blur'
  };

  constructor(private listService: ListService, private helperService: HelperService) {
    this.itemForm = new FormGroup({
      title: new FormControl('', this.inputValidationOptions),
      deadline: new FormControl(helperService.getTodayDate(), this.inputValidationOptions)
    });
    this.items = [];
  }

  ngOnInit() {
  }

  hasError(controlName: string, errorName: string) {
    return this.itemForm.controls[controlName].hasError(errorName);
  }

  onSubmit(formValues) {
    if (this.itemForm.valid) {
      const item = this.listService.createListItem(formValues.title, formValues.deadline.startOf('day'));
      this.items.push(item);
    }
  }

  getItemClass(date: moment.Moment) {
    return this.listService.getListItemStyle(date.startOf('day'));
  }
}
