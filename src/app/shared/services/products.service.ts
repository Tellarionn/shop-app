import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  filter,
  Observable,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { IProduct } from '../interfaces/product';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getTenProducts(): Observable<IProduct[]> {
    const params = new HttpParams().set('limit', '10');

    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products', { params })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getProductsList(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>('https://fakestoreapi.com/products')
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  public getOneProduct(id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>(`https://fakestoreapi.com/products/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }

  
}
