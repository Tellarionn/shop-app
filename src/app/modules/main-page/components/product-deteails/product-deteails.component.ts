import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, switchMap, take, tap } from 'rxjs';
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

    this.product = this.activatedRoute.params.pipe(
      filter((params) => !!params['id']),
      map((params) => params['id'] as number),
      switchMap((id) => this.productService.getOneProduct(id).pipe(
        tap(() => this.progressBar = false)
      )),
      take(1),
    );
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
