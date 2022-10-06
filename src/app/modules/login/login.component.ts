import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  private createForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ],
      ],
    });
  }

  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['main-page/home']),
      error: (err) => alert(err.message),
    });
  }

  ngOnInit(): void {
    this.createForm();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['main-page/home']);
    }
  }
}
