import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe, take, tap } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-deteails',
  templateUrl: './product-deteails.component.html',
  styleUrls: ['./product-deteails.component.scss'],
})
export class ProductDeteailsComponent implements OnInit {
  public product!: Observable<IProduct>;
  public id!: number;
  public counter: number = 1;
  public progressBar: boolean = true;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe((params) => (this.id = params?.['id']));
    this.product = this.productService
      .getOneProduct(this.id)
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
