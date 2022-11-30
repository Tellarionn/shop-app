import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public cartCounter = this.isCartEmpty;

  constructor(
    private authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart()
  }

  public get isCartEmpty(): Observable<number> {
    return this.cartService.getCartLength;
  }

  public logout():void {
    this.authService.logout();
  }
}
