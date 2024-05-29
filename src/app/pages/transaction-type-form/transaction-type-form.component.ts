import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { TransactionTypeService } from '../../services/transaction-type/transaction-type.service';

@Component({
  selector: 'app-transaction-type-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './transaction-type-form.component.html',
  styleUrl: './transaction-type-form.component.css',
})
export class TransactionTypeFormComponent {
  constructor(public transactionTypeService: TransactionTypeService) {}

  transactionType = {
    add: false,
    description: '',
  };

  public async saveTransactionType() {
    try {
      await this.transactionTypeService.create(this.transactionType);
    } catch (error) {
      console.error(error);
    }
  }
}
