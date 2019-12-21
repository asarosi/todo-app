import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Item } from '../list/list-component/item';

const STORAGE_KEY = 'local_todolist';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  public storeOnLocalStorage(list: Item[]): void {
    this.storage.set(STORAGE_KEY, list);
  }

  public getListFromStorage(): Item[] {
    return this.storage.get(STORAGE_KEY) || [];
  }
}
