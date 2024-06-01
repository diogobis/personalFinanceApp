import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FileService } from '../../services/file/file.service';

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
  ];

  public user;
  constructor(private router: Router, public fileService: FileService) {
    this.user = JSON.parse(localStorage.getItem('pocketbase_auth') as string);

    this.router.events.subscribe((evt) => {
      if (evt.type == 1) {
        this.user = JSON.parse(
          localStorage.getItem('pocketbase_auth') as string
        );
      }
    });
  }

  public logout() {
    localStorage.removeItem('pocketbase_auth');
    this.router.navigate(['login']);
  }
}
