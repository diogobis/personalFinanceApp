import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TransactionFormComponent } from './pages/transaction-form/transaction-form.component';
import { TransactionTypeFormComponent } from './pages/transaction-type-form/transaction-type-form.component';
import { AccountFormComponent } from './pages/account-form/account-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: TransactionFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transaction-type', component: TransactionTypeFormComponent },
  { path: 'accounts', component: AccountFormComponent },
];
