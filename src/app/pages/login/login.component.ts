import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public username: string = '';
  public password: string = '';

  constructor(private usersService: UsersService, private router: Router) {}

  public async login() {
    let result = await this.usersService
      .authenticate(this.username, this.password)
      .catch((error) => {
        alert('Login falhou');
      });

    if (result) {
      this.router.navigate(['home']);
    }
  }
}
