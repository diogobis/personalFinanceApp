import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { TransactionService } from '../../services/transaction/transaction.service';
import { AccountsService } from '../../services/accounts/accounts.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TransactionTypeService } from '../../services/transaction-type/transaction-type.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [TableComponent, FormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit {
  transaction: any = {
    date: '',
    value: '',
    type: '',
    account: '',
  };
  displayValue: string = '';

  accounts: any = [];
  accountsOptions: any = [];

  types: any = [];
  typesOptions: any = [];

  constructor(
    public transactionService: TransactionService,
    private decimalPipe: DecimalPipe,
    private accountsService: AccountsService,
    private transactionTypeService: TransactionTypeService
  ) {
    let d: any = new Date();

    d = new Date(d.setHours(d.getHours() - 3))
      .toISOString()
      .replace('Z', '')
      .split(':');

    d = d[0] + ':' + d[1];
    this.transaction.date = d;
  }

  async ngOnInit() {
    let resultAccounts = await this.accountsService.get();
    this.accounts = resultAccounts;
    this.accountsOptions = this.accounts.map((a: any) => {
      return {
        label: a.name,
        value: a.id,
      };
    });

    let resultTypes = await this.transactionTypeService.get();
    this.types = resultTypes;
    this.typesOptions = this.types.map((a: any) => {
      return {
        label: a.description,
        value: a.id,
      };
    });
  }

  formatValue() {
    this.displayValue = this.displayValue
      .replace(/[\.,\,]/gm, '')
      .replace(/[^0-9]/gm, '');

    let ns = this.displayValue.split('');

    if (ns.length > 2) {
      ns = [
        ...ns.slice(0, ns.length - 2),
        '.',
        ...ns.slice(ns.length - 2, ns.length),
      ];
    }

    if (ns.length > 6) {
      for (let i = ns.length - 6; i >= 0; i -= 3) {
        if (i !== 0) ns = [...ns.slice(0, i), ',', ...ns.slice(i, ns.length)];
      }
    }

    this.displayValue = ns.join('');
  }

  public async saveTransaction() {
    this.transaction.value = this.displayValue.replace(/[\.,\,]/gm, '');
    this.transaction.value = parseFloat(
      this.transaction.value.padStart(3, '0').replace(/(\d{2})$/, '.$1')
    );

    try {
      await this.transactionService.create({
        date: new Date(this.transaction.date)
          .toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        value: this.transaction.value,
        type: this.transaction.type,
        account: this.transaction.account,
      });

      this.transaction = {
        date: '',
        value: '',
        type: '',
        account: '',
      };
      this.displayValue = '';
    } catch (err) {
      console.error(err);
    }
  }
}
