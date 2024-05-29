import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeService extends BaseService {
  constructor() {
    super('transactionType');
  }
}
