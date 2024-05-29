import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TransactionFormComponent } from './pages/transaction-form/transaction-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: TransactionFormComponent},
  { path: 'home', component: HomeComponent },
];
