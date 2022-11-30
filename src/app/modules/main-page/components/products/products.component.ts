import { Component, OnInit } from '@angular/core';
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
  public productsList!: Observable<IProduct[]>;
  public hideBtn: boolean = false;
  public progressBar: boolean = true;
  public term: string = '';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsList = this.productsService
      .getTenProducts()
      .pipe(tap(() => ((this.progressBar = false), (this.hideBtn = true))));
  }
  public showMore() {
    this.progressBar = true;
    this.hideBtn = !this.hideBtn;
    this.productsList = this.productsService
      .getProductsList()
      .pipe(tap(() => (this.progressBar = false)));
  }

  public addToCart(item: IProduct): void {
    if (!this.cartService.itemInCart(item)) {
      this.cartService.addToCart(item);
    }
  }

  public itemInCart(item: IProduct): boolean {
    return this.cartService.itemInCart(item);
  }

  public removeFromCart(item: IProduct): void {
    this.cartService.removeItem(item);
  }
}
