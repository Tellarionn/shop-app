import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public cartCounter = this.isCartEmpty;

  public get isCartEmpty(): Observable<number> {
    return this.cartService.getCartLength;
  }

  constructor(
    private authService: AuthService,
    public cartService: CartService
  ) {}

  public logout() {
    this.authService.logout();
  }
}
