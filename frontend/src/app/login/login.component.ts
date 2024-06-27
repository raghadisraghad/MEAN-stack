import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  token = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        this.token = response.token; // Store the token
        localStorage.setItem('token', this.token); // Register the token
        this.router.navigate(['/portfolio']); // Redirect to AppComponent
      },
      (error) => {
        this.errorMessage = error.error.message; // Display error message to user
      }
    );
  }
  //
  // logout() {
  //   this.authService.logout();
  //   localStorage.removeItem('token'); // Remove the token from localStorage
  //   this.router.navigate(['/login']); // Redirect to LoginComponent
  // }
}
