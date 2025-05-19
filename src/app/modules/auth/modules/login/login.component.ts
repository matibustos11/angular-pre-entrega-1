import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) { }

  login() {
    localStorage.setItem('token', 'asd12354ws');
    this.router.navigate(['dashboard']);
  }

}
