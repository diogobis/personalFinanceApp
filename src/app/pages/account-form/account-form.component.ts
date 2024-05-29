import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { AccountsService } from '../../services/accounts/accounts.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css',
})
export class AccountFormComponent {
  public account = {
    name: '',
  };

  constructor(public accountsService: AccountsService) {}

  async saveAccount() {
    try {
      await this.accountsService.create(this.account);
    } catch (error) {
      console.error(error);
    }
  }
}
