import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { ListService } from './list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  public itemForm: FormGroup;
  items: Item[];

  constructor(private listService: ListService) {
    this.itemForm = new FormGroup({
      title: new FormControl('', {
        validators: Validators.required,
        updateOn: 'blur'
      }),
      deadline: new FormControl(new Date(), {
        validators: Validators.required,
        updateOn: 'blur'
      })
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
      const item = this.listService.createListItem(formValues.title, formValues.deadline);
      this.items.push(item);
    }
  }
}
