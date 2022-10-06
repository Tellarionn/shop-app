import { Component, OnInit } from '@angular/core';
import { isEmpty, observable, Observable, of } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items!: Observable<IProduct[]>;
  isCartEmpty!: Observable<number>;
  randomOrderNumber!: number | null;

  constructor(
    private cartService: CartService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    this.items = this.cartService.items$;
    this.isCartEmpty = this.cartService.getCartLength;
    this.randomOrderNumber = this.getRandomNumber();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  removeFromCart(item: IProduct): void {
    this.cartService.removeItem(item);
  }

  get total(): number {
    return this.cartService.getTotal;
  }

  increment(item: IProduct) {
    this.cartService.increment(item);
    this.cartService.saveCart();
  }

  decrement(item: IProduct) {
    this.cartService.decrement(item);
    this.cartService.saveCart();
  }

  getSubTotal(item: IProduct): number {
    return item.price * item.qty!;
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * (200 - 150)) + 150;
  }
}
