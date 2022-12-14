import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
} from 'rxjs';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly items = new BehaviorSubject<IProduct[]>([]);
  public items$ = this.items.asObservable();

  public get getItems(): IProduct[] {
    return this.items.value;
  }

  public get getCartLength(): Observable<number> {
    return this.items$.pipe(map((items) => items.length));
  }

  public get isCartEmpty(): Observable<boolean> {
    return this.items$.pipe(map((items) => items.length? true : false))
  }

  public get getTotal(): number {
    return this.items.value.reduce(
      (sum, x) => ({
        qty: 1,
        variationCost: sum.variationCost + x.qty! * x.price,
      }),
      { variationCost: 0 }
    ).variationCost;
  }

  public loadCart(): void {
    this.items.next(JSON.parse(localStorage.getItem('cart_items') || '[]'));
  }

  public addToCart(addedItem: IProduct): void {
    addedItem.qty = 1;
    const currentValue = this.items.value;
    this.items.next([...currentValue, addedItem]);
    this.saveCart();
  }

  public removeItem(item: IProduct): void {
    const result = this.items.value.filter(p => p.id !== item.id);
    if (!this.items.value.length) {
      this.clearCart();
    } else {
      this.updateCart(result);
    }
    this.saveCart();
  }


  public updateCart(products: IProduct[]): void {
    this.items.next(products);
  }

  public saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items.value));
  }

  public clearCart(): void {
    this.items.next([]);
    localStorage.removeItem('cart_items');
  }

  public itemInCart(item: IProduct): boolean {
    return this.items.value.findIndex((o) => o.id === item.id) > -1;
  }

  public increment(item: IProduct): void {
    const products = this.items.value.map((product) => {
      if (product.id === item.id) {
        return {
          ...product,
          qty: (product.qty ?? 0) + 1,
        }
      } else {
        return product;
      }
    });
    this.updateCart(products);
  }

  public decrement(item: IProduct): void {
    const products = this.items.value.map((product) => {
      if (product.id === item.id) {
        if (product.qty === 1) {
           return product;
        }
        return {
          ...product,
          qty: (product.qty ?? 0) - 1,
        }
      } else {
        return product;
      }
    });
    this.updateCart(products);
  }
}
