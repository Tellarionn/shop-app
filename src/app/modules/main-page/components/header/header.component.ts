import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
