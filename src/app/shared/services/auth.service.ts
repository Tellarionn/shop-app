import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  public setToken(token: string):void {
    localStorage.setItem('token', token);
  }

  public getToken():string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public login(userInfo: IUser): Observable<string | boolean> {
    if (
      userInfo.email === 'admin@gmail.com' &&
      userInfo.password === 'admin123'
    ) {
      this.setToken('admintoken');
      return of(true);
    }
    return throwError(() => new Error('Wrong login or password'));
  }

  public logout():void {
    this.router.navigate(['login']);
  }
}
