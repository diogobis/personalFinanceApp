import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { TransactionService } from '../../services/transaction/transaction.service';
import { AccountsService } from '../../services/accounts/accounts.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent {
  constructor(
    public transactionService: TransactionService,
    public accountService: AccountsService
  ) {}
}
