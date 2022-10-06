import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList!: Observable<IProduct[]>;
  hideBtn: boolean = false;
  progressBar: boolean = true;
  term: string = '';

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    this.productsList = this.productsService
      .getTenProducts()
      .pipe(tap(() => ((this.progressBar = false), (this.hideBtn = true))));
  }
  showMore() {
    this.progressBar = true;
    this.hideBtn = !this.hideBtn;
    this.productsList = this.productsService
      .getProductsList()
      .pipe(tap(() => (this.progressBar = false)));
  }

  addToCart(item: IProduct): void {
    if (!this.cartService.itemInCart(item)) {
      this.cartService.addToCart(item);
    }
  }

  itemInCart(item: IProduct): boolean {
    return this.cartService.itemInCart(item);
  }

  removeFromCart(item: IProduct): void {
    this.cartService.removeItem(item);
  }
}