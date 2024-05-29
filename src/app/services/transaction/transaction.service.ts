import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { BaseServiceChild } from '../../interfaces/base-service-child';

@Injectable({
  providedIn: 'root',
})
export class TransactionService
  extends BaseService
  implements BaseServiceChild
{
  constructor() {
    super('transaction');
  }
}
