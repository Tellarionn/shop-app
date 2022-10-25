import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isVisible = new BehaviorSubject<boolean>(false);
  public isVisible$ = this.isVisible.asObservable();

  public open(): void {
    this.isVisible.next(true);
  }

  public close(): void {
    this.isVisible.next(false);
  }
}
