import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-deteails',
  templateUrl: './product-deteails.component.html',
  styleUrls: ['./product-deteails.component.scss'],
})
export class ProductDeteailsComponent implements OnInit {
  product!: Observable<IProduct>;
  id!: number;
  counter: number = 1;
  progressBar: boolean = true;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    this.activatedRoute.params.subscribe(
      (params) => (this.id = params?.['id'])
    );
    this.product = this.productService
      .getOneProduct(this.id)
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
