import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { BaseServiceChild } from '../../interfaces/base-service-child';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService implements BaseServiceChild {
  constructor() {
    super('users');
  }

  public async authenticate(username: string, password: string) {
    return this.collection.authWithPassword(username, password);
  }
}
