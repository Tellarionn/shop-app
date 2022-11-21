import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error = new Subject();

  constructor() {}

  public handle(message: string) {
    this.error.next(message);
  }
}
