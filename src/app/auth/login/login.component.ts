import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Authentication successful, redirect to task list page
        const authToken = response.token;
        // Store the authentication token securely (e.g., in localStorage)
        localStorage.setItem('authToken', authToken);

        this.router.navigate(['/tasks']);
      },
      (error) => {
        console.log('eh');
        this.errorMessage = error.error.message; // Display error message
      }
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
