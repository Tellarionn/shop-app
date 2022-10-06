import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  isEmpty,
  map,
  Observable,
  of as observableOf,
} from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = new BehaviorSubject<IProduct[]>([]);
  public items$ = this.items.asObservable();

  get getItems(): IProduct[] {
    return this.items.value;
  }

  get getCartLength(): Observable<number> {
    return this.items$.pipe(map((items) => items.length));
  }

  get getTotal(): number {
    return this.items.value.reduce(
      (sum, x) => ({
        qty: 1,
        variationCost: sum.variationCost + x.qty! * x.price,
      }),
      { variationCost: 0 }
    ).variationCost;
  }

  loadCart(): void {
    this.items.next(JSON.parse(localStorage.getItem('cart_items') || '[]'));
  }

  addToCart(addedItem: IProduct): void {
    addedItem.qty = 1;
    const currentValue = this.items.value;
    this.items.next([...currentValue, addedItem]);
    this.saveCart();
  }

  removeItem(item: IProduct): void {
    const index = this.items.value.findIndex((o) => o.id === item.id);
    if (index > -1) {
      this.items.value.splice(index, 1);
      if (this.items.value.length === 0) {
        localStorage.removeItem('cart_items');
        this.items.next([]);
      }
      this.saveCart();
    }
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items.value));
  }

  clearCart(): void {
    this.items.next([]);
    localStorage.removeItem('cart_items');
  }

  itemInCart(item: IProduct): boolean {
    return this.items.value.findIndex((o) => o.id === item.id) > -1;
  }

  increment(item: IProduct): void {
    item.qty!++;
  }

  decrement(item: IProduct): void {
    if (item.qty! > 1) {
      item.qty!--;
    } else item.qty! = 1;
  }
}