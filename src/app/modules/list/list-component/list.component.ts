import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ListService } from './list.service';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HelperService } from '../../helpers/helper.service';
import { LocalStorageService } from '../../helpers/local-storage.service';

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

  constructor(private listService: ListService, private helperService: HelperService, private localStorageService: LocalStorageService) {
    this.itemForm = new FormGroup({
      title: new FormControl('', this.inputValidationOptions),
      deadline: new FormControl(
        {
          value: helperService.getTodayDate(),
          disabled: true
        }, this.inputValidationOptions)
    });
    this.items = localStorageService.getListFromStorage();
  }

  ngOnInit() {
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.itemForm.controls[controlName].hasError(errorName);
  }

  onSubmit(formValues): void {
    const form = this.itemForm;
    if (form.valid) {
      const item = this.listService.createListItem(formValues.title, form.getRawValue().deadline.startOf('day'));
      this.items.push(item);
      this.localStorageService.storeOnLocalStorage(this.items);
    }
  }

  getItemClass(date: moment.Moment, isCompleted: boolean): string {
    const d = moment(date).startOf('day');
    return this.listService.getListItemStyle(d, isCompleted);
  }

  completeItem(item: Item): void {
    item.isCompleted = !item.isCompleted;
    this.localStorageService.storeOnLocalStorage(this.items);
  }

  removeItem(id: string): void {
    this.items = this.listService.remove(this.items, id);
    this.localStorageService.storeOnLocalStorage(this.items);
  }

  onSave(item): void {
    this.listService.applyPendingUpdates(item);
    this.localStorageService.storeOnLocalStorage(this.items);
  }

  onValueChange(item, value): void {
    this.listService.addPendingUpdates(item, value);
  }

  onCancel(item): void {
    this.listService.removePendingUpdates(item);
  }
}
