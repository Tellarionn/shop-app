import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() public total!: number;
  @Input() public randomOrderNumber!: number | null;
  payToggle: boolean = false;
  orderForm!: FormGroup;

  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern("^(?=.{1,15}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"),
        ],
      ],
      userLastName: [
        '',
        [
          Validators.required,
          Validators.pattern("^(?=.{1,15}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$"),
        ],
      ],
      userPhone: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      userAddress: ['', [Validators.required]],
      userCard: ['', [Validators.pattern('[0-9]{16}')]],
    });
  }

  public buy(): void {
    console.log(this.orderForm.value);
  }
}
