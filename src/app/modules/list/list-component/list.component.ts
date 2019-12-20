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
      deadline: new FormControl(
        {
          value: helperService.getTodayDate(),
          disabled: true
        }, this.inputValidationOptions)
    });
    this.items = [];
  }

  ngOnInit() {
  }

  hasError(controlName: string, errorName: string) {
    return this.itemForm.controls[controlName].hasError(errorName);
  }

  onSubmit(formValues) {
    const form = this.itemForm;
    if (form.valid) {
      const item = this.listService.createListItem(formValues.title, form.getRawValue().deadline.startOf('day'));
      this.items.push(item);
    }
  }

  getItemClass(date: moment.Moment, isCompleted: boolean) {
    return this.listService.getListItemStyle(date.startOf('day'), isCompleted);
  }

  completeItem(item: Item) {
    item.isCompleted = !item.isCompleted;
  }

  removeItem(id: string) {
    this.items = this.listService.remove(this.items, id);
  }

  onSave(item) {
    this.listService.applyPendingUpdates(item);
  }

  onValueChange(item, value) {
    this.listService.addPendingUpdates(item, value);
  }

  onCancel(item) {
    this.listService.removePendingUpdates(item);
  }
}
