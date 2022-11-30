import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private error = new Subject();

  public handle(message: string) {
    this.error.next(message);
  }
}
