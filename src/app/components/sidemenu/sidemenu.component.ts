import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {
  public routes: any = [
    {
      label: 'Main',
      links: [
        { path: 'home', label: 'Home' },
        { path: 'transaction', label: 'Transactions' },
      ],
    },
    {
      label: 'Settings',
      links: [
        { path: 'transaction-type', label: 'Types' },
        { path: 'accounts', label: 'Accounts' },
      ],
    },
    {
      label: 'Logout',
      links: [{ path: 'login', label: 'Sign out' }],
    },
  ];
}
